var m = _ =>
  !_ ? _ :
  Array.isArray(_) ? _.map(m) :
  (_.length == 2) ? map_[parseInt(_,36)] :
  map_.indexOf(_).toString(36).padStart(2,0).replace('-1','');

function parse(_) {
  var k = '000000000000007d2c10000000000000d4c4a7e9000100000102000000';
  var h = new Uint8Array(_).toHex();
  var i = h.indexOf(k);

  var s = _      => s.last = (_ ? String.fromCharCode(parseInt(_.slice(0,2), 16)) + s(_.slice(2)) : '');
  var q = _      => q.last = p() + p() * 256;
  var p = offset => p.last = parseInt(n(1,offset), 16);
  var n = (length,offset) => {
    if (length == null) length = q();
    length *= 2;
    offset *= 2;
    if (!offset) {
      i += length;
      offset = -length;
    }

    return n.last = h.substring(i + offset, i + offset + length);
  };

  var brother = [];
  var brotherCount = p(-19);
  while (brotherCount--) {
    i = h.indexOf(k,i) + k.length;

    var c = p(); // visual layer
    while (c--) {
      n();   // key
      n(12); // value
      n(53); // separator
    }

    var c = q(); // header member
    while (c--) {
      var name = n();
      var type = p();
      i += (type == 2) ? 2 : 8;
    }

    var b = { i:'', b:'', a:['','',[]] };
    brother.push(b);
    p();  // action points
    for (var a = 0; a < 8; a++) b.a[0] += q().toString(36).padStart(2,0);
    n(6); // greedAndGluttony
    p();  // pouches

    var c = p(); // inventory
    while (c--) {
      var slot = p();
      var id   = n(4).toUpperCase();
      var o    = map.get(id);
      b[ slot == 6 ? 'b' : 'i' ] += m(id);
      switch (o.type) {
        case 'attachment':
          n(20);
          break;

        case 'namedWeapon':
          n();
          n(30);
        case 'genericWeapon':
          n(16);
          if (o.subType == 'masterworkBow') n();
          break;

        case 'namedShield':
          n(4);
        case 'genericShield':
          n(14);
          if (o.subType == 'nobleShield') p();
          if (o.type == 'namedShield') {
            n();
            n(7);
          }
          break;

        case 'namedHelmet':
        case 'namedArmor':
          n();
          n(5);
        case 'genericHelmet':
        case 'genericArmor':
          if (o.subType == 'nobleArmor') p();
          if (o.slot == 'body') {
            var id = n(4).toUpperCase().replace('00000000','');
            if (id) {
              b.i += m(id);
              n(20);
            }
          }

          n(18);
          if (o.slot == 'body') n(4);
          if (o.subType == 'davkul') n();
          break;

        case 'auxiliary':
          n(14);
          if (o.subType == 'ammo')       n(2);
          if (o.subType == 'canine')     n();
          if (o.subType == 'provisions') n(10);
          if (o.subType == 'commodity')  n(2);
          break;
      }
    }

    var c = q(); // background / trait / perk
    while (c--) {
      var id = n(4).toUpperCase();
      var o  = map.get(id);
      n(1); // isNew
      if (o.type == 'background') {
        b.t = m(id);
        break;
      }

      b.i += m(id);
    }

    n();  // description
    n();  // description template
    n(2); // unknown
    n(4); // salary multiplier - float
    if (m(['6DF381C6','CB90AA90']).includes(b.t)) p(); // tattoo - wildman and barbarian

    while (c--) {
      var id = n(4).toUpperCase();
      var o  = map.get(id);
      if (o.type != 'injury')    p();
      if (o.type == 'injury')    n(14);
      if (o.type == 'training')  n(37);
      if (o.type == 'knowledge') n(12);
      if (o.type == 'learning')  n(2);

      if (o.type == 'perk')
        b.i += m(id);
      else if (['trait','permanentInjury','potion-effect'].includes(o.type))
        b.t += m(id);
      else if (!['internal','injury','training','knowledge','learning','oath'].includes(o.type))
        console.dir(o);
    }

    b.n = s(n()) + '\n' + s(n());
    n(4); // light wound - float
    n(4); // experience
    n(6); // human class and inheritors
    p();  // level total
    p();  // perk points
    p();  // perk used
    p();  // level points
    n(4); // morale - float

    var c = p(); // morale modifier
    while (c--) {
      p();
      n();
      n(4);
    }
    n(8);

    for (var a = 0; a < 8; a++) b.a[1] += p(); // star
    for (var a = 0; a < 8; a++) b.a[2].push(n(p()).replaceAll('0','')); // points
    b.a[1] = parseInt(b.a[1],4).toString(36);
    if (b.a[2][0] < 2) {
      b.a[2] = '';
    } else {
      var a = '22231212'.split('').map((_,i) => parseInt(b.a[2][i].split('').map($ => $ - _).join(''), 4).toString(36));
      var l = Math.max(...a.map(_ => _.length));
      b.a[2] = b.a[2][0].length.toString(16) + a.map(_ => _.padStart(l,0)).join('');
    }
  }

  return brother.sort((a,b) => (a.n > b.n) - (a.n < b.n));
}

var toString = _ => _.map(b => [
  b.t, b.i, b.b,
  b.a[0], b.a[1], b.a[2], b.a[3], b.a[4],
  new TextEncoder().encode(b.n).toBase64({ omitPadding:true, alphabet:'base64url' })
].join('/')).join(';');

var fromString = _ => _.replace(/.*=/,'').split(';').map(_ => {
  var b = {a:[]};
  [ b.t, b.i, b.b, b.a[0], b.a[1], b.a[2], b.a[3], b.a[4], b.n ] = _.split('/');
  b.n = new TextDecoder().decode(Uint8Array.fromBase64(b.n || '', {alphabet:'base64url'}));
  return b;
});
