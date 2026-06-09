var observer;
var printFix;
var count = 0;
function draw(_, persist) {
  console.dir(_);
  _.forEach(b => {
    var s = _ => (_ || '').split(/(..)/).filter(_=>_);

    var c = (_,tag,style,parent) => {
      var e = document.createElement(tag);
      if (typeof style == 'string')
        e.classList.add(style);
      else
        Object.keys(style || 0).forEach(_ => e.style[_] = style[_]);

      e.innerText = _;
      (parent || d).append(e);
      return e;
    };

    var i = (_,style,parent) => {
      if (_?.length == 2) _ = m(_);

      var o = map.get(_);
      var e = c('', (!_ || o) ? 'span' : 'img', style, parent);
      if (o)
        setImage(e,_,o);
      else
        e.src = _;

      return e;
    };

    var d = c('', 'div', {
      display:  'inline-block',
      position: 'relative',
      margin:   '0 -1px -1px 0',
      width:    '1069px',
      border:   '1px solid',
    }, document.body);
    d.b = b;

    c('','div','collapse').onclick = e => e.target.classList.toggle('ed');

    var _ = c('','div','menu');
    c('#' + ++count,                   'div', 0, _);
    c('\xa0 \xa0 Move Up',             'div', 0, _).onclick = e => d.previousElementSibling?.b && d.previousElementSibling.before(d);
    c('\xa0 \xa0 Move',                'div', 0, _).onclick = e => { for (var i = +prompt('Offset?',0); i; i -= Math.sign(i)) e.target[ i < 0 ? 'previousSibling' : 'nextSibling' ].click(); };
    c('\xa0 \xa0 Move Down \xa0 \xa0', 'div', 0, _).onclick = e => d.nextElementSibling    ?.b && d.nextElementSibling    .after (d);
    c('\xa0 \xa0 Dismiss',             'div', 0, _).onclick = e => confirm('Dismiss?') && d.remove();
    c('\xa0 \xa0 Share',               'div', 0, _).onclick = e => prompt('Link:', location.origin + location.pathname + '?hire=' + toString([b]));
    c(' Persist',              'div', 'persist', _).onclick = e => e.target.classList.toggle('yes');
    if (persist) _.lastChild.classList.add('yes');

    var _ = c('', 'div', { position: 'absolute', margin: '24px 0 0 505px' });
    [
      0,'3E7523FA','F9473B3C','4C867685','9D82F592','A546AF20','565F97BE','AB0464F3','A3233C22','C07D23FB',
      0,'059702B2','CA385200','ECCF150A','2468BB8C','8BDA1308','07AD742B','0BADB437','9899E380',
      0,'71C41BDA','1423C822','A1DE723D','04A8366D','CA7913AA','09E3AD30','E3FC2F93','E1E8D40B',
      0,'5F1ECE27','F1AB0AC0','53D89DC8','1B63AB23','CF52B42E','D03C87C1','BBA910B8','1DE5F9FF','E49B81C1','4BA8F880','3967AB23','B7571E54',
      0,'BACAD9E4','026F2FA2','12CC3EA1','5D8933A5','404C93E1',
      0,'97CB0D95','80A40871','385FD79D','37CEF631',
      0,'ABC22EAE','C3229207','7C856C1D','F521E3DD',
    ].forEach(p => {
      if (!p) return c('', 'span', 0, c('','center',0,_));

      var e = i(p, 'perk', _.lastChild.lastChild);
      e.onclick = _ => {
        if (e.title == 'Student') return;

        b.i = s(b.i).filter(_ => _ != m(p)).join('');
        if (e.classList.toggle('selected')) b.i += m(p);

        var t = 0;
        e.parentElement.parentElement.parentElement.childNodes.forEach((_,i) => {
          var l = Array.from(_.lastChild.children).filter(_ => _.classList.contains('selected') || _.title == 'Student').length;
          _.lastChild.style.outline = (l && (i > t || t + l > 11)) ? '1px solid red' : '';
          t += l;
        });

        d.querySelector('[title="Student"]')?.classList.toggle('selected', d.querySelectorAll('.perk.selected:not([title="Student"])').length == 10);
        d.querySelectorAll('center span').forEach(_ => _.update?.());
      };
      if (s(b.i).includes(m(p))) e.click();
    });

    var $ = (type,options,_) => {
      if ('ib'.includes(type)) _.classList.add('pouch');
      _.onclick = e => select(options, _.dataset.hex?.replace('68DADB2C','') || '', x => {
        var h = _.dataset.hex;
        if (h == '68DADB2C' && !x.dataset.hex) return;

        Object.assign(_.dataset,x.dataset);
        _.title = x.title;
        if (type == 'i') {
          b.i = s(b.i).filter(_ => _ != m(h)).join('') + m(x.dataset.hex);
        } else if (type == 'b') {
          b.b = Array.from(d.querySelectorAll('.pouch')).slice(-4).map(_ => m(_.dataset.hex)).join('');
        } else {
          b.t = Array.from(_.parentElement.children).map(_ => m(_.dataset.hex.replace('68DADB2C',''))).join('');
          _.parentElement.check();
          if (!x.dataset.hex)
            _.remove();
          else if (h == '68DADB2C')
            $('t', ['trait','permanentInjury','potion-effect'], i(h, 0, _.parentElement));
        }

        d.querySelectorAll('center span').forEach(_ => _.update?.());
      });
    };
    var g = _ => s(b.i).find(i => _ == map.get(m(i)).slot);
    $('i', ['trinket'                       ], i(g('trinket'   ), { right: '503px', top:    '11px' }));
    $('i', ['quiver'                        ], i(g('quiver'    ), { right:  '11px', top:    '11px' }));
    $('i', ['helmet'                        ], i(g('helmet'    ), { right: '442px', bottom: '72px' }));
    $('i', ['body'                          ], i(g('body'      ), { right: '442px', bottom: '11px' }));
    $('i', ['attachment'                    ], i(g('attachment'), { right: '503px', bottom: '72px' }));
    $('i', ['weapon'                        ], i(g('weapon'    ), { right: '503px', bottom: '11px' }));
    $('i', ['shield'                        ], i(g('shield'    ), { right: '381px', bottom: '11px' }));
    $('b', ['weapon','quiver','shield','bag'], i(s(b.b)[0],       { right:  '72px', bottom: '72px' }));
    $('b', ['weapon','quiver','shield','bag'], i(s(b.b)[1],       { right:  '11px', bottom: '72px' }));
    $('b', ['weapon','quiver','shield','bag'], i(s(b.b)[2],       { right:  '72px', bottom: '11px' }));
    $('b', ['weapon','quiver','shield','bag'], i(s(b.b)[3],       { right:  '11px', bottom: '11px' }));

    var _ = c('','span','traitBox');
    s(b.t = b.t || m('140AD17E')).concat('68DADB2C').forEach((t,j) => $('t', j ? ['trait','permanentInjury','potion-effect'] : ['background'], i(t,0,_)));
    _.check = function check() {
      var m = {};
      this.childNodes.forEach(_ => {
        var t = _.title.replace(/-.*/,'').replace(/(Pit|Arena).*/,'AA');
        m[t] = m[t] || _;
        _.style.backgroundColor = m[t].style.backgroundColor = (m[t] == _) ? '' : 'red';
      });
    };
    _.check();

    c(b.n || '(no name)', 'center', {
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      margin:         '14px 0',
      width:          '250px',
      height:         '60px',
      font:           'bold 26px/30px Cinzel',
      whiteSpace:     'nowrap',
      color:          '#da2',
      cursor:         'pointer',
    }).onclick = e => {
      var _ = e.target;
      var n = prompt('Name?',  _.innerText.split('\n')[0]); if (n == null) return;
      var t = prompt('Title?', _.innerText.split('\n')[1]); if (t == null) return;
      b.n = _.innerText = n + '\n' + t;
    };

    [
      [0,0,2,'health'],
      [2,2,2,'fatigue'],
      [1,1,2,'resolve'],
      [7,3,3,'initiative'],
      [3,4,1,'meleeSkill'],
      [4,5,2,'rangedSkill'],
      [5,6,1,'meleeDefense'],
      [6,7,2,'rangedDefense'],
    ].forEach((_,__) => {
      c(parseInt(b.a?.[4]?.[_[0]] || 0, 36), 'div', {
        position:   'absolute',
        marginLeft: '162px',
        width:      '20px',
        fontSize:   '.8em',
        textAlign:  'right',
        cursor:     'pointer',
      }).onclick = e => {
        var x = prompt('Veteran level?', e.target.innerText);
        if (x == null) return;

        b.a = b.a || [];
        b.a[4] = (b.a[4] || '').split('');
        e.target.innerText = parseInt(b.a[4][_[0]] = (+x || 0).toString(36)[0], 36);
        b.a[4] = [...b.a[4]].map(_ => _ || 0).join('');
        v.update();
      };

      i('assets/icon-' + _[3].replace('melee','m').replace('ranged','r') + '.png', { margin:'-9px 5px', width:'30px' });
      for (var j = 0; j < parseInt(b.a?.[1] || 0, 36).toString(4).padStart(8,0)[_[1]]; j++)
        i('assets/icon-special.png', {
          position:   'absolute',
          marginLeft: (j * 13 - 2) + 'px',
          marginTop:  '-6px',
          width:      '14px',
        });

      var v = c('', 'center', {
        display:      'inline-block',
        marginRight:  '.5em',
        width:        '143px',
        height:       '19px',
        outline:      '1px solid #000',
        border:       '1px solid #888',
        borderRadius: '3px',
      });
      v = c('', 'span', { padding:'0 1em', cursor:'pointer' }, v);
      v.title  = parseInt(s(b.a?.[0])[_[0]] || 0, 36);
      v.points = [];
      v.update = $ => {
        var f = 1;
        var i = +v.title + parseInt(b.a?.[4]?.[_[0]] || 0, 36);
        v.points.forEach(_ => i += _[0] * _[1].classList.contains('selected'));
        m(s(b.t)).forEach(t => {
          f *= {
            '5EEFDF76': { resolve:.9, meleeSkill:.9, rangedSkill:.9, meleeDefense:.9, rangedDefense:.9, }, // Addict
            '83B8CEC7': { resolve:1.15, initiative:.75,                                                 }, // Brain Damage
            'C93E3963': { meleeSkill:.8, rangedSkill:.8, meleeDefense:.7,                               }, // Broken Elbow Joint
            'AC1BFE37': { meleeDefense:.6, rangedDefense:.6, initiative:.6,                             }, // Broken Knee
            '97D37685': { fatigue:.6,                                                                   }, // Partly Collapsed Lung
            '41052580': { initiative:.8,                                                                }, // Maimed Foot
            '3E2CA5D6': { initiative:.9,                                                                }, // Missing Ear
            'AD97DB01': { rangedSkill:.5,                                                               }, // Missing Eye
            '7D13BB0E': { meleeSkill:.95, rangedSkill:.95,                                              }, // Missing Finger
            '2FDDE79B': { fatigue:.9,                                                                   }, // Missing Nose
            '330BF306': { resolve:.6, initiative:.7,                                                    }, // Traumatized
            '30184A38': { health:.7,                                                                    }, // Weakened Heart
            '11AEA18F': { resolve:.5,                                                                   }, // Afraid
          }[t]?.[_[3]] || 1;

          i += {
            '35186772': { resolve:10,                                             }, // Acolyte of Davkul
            '38B9EBE5': { resolve:5,                                              }, // Arena Fighter
            '90786E95': { resolve:10,                                             }, // Arena Veteran
            '15A02709': { resolve:5,                                              }, // Brave
            '8F1F3216': { meleeSkill:-5,                                          }, // Brute
            'C8944B46': { health:20, resolve:10, meleeDefense:5, rangedDefense:5, }, // Chosen of Davkul
            'B65EAFC8': { meleeSkill:-5,                                          }, // Clumsy
            'A6BB1D0B': { resolve:5, meleeDefense:-5, rangedDefense:-5,           }, // Cocky
            '38B69657': { resolve:-10,                                            }, // Craven
            'E8BBE11A': { meleeSkill:5,                                           }, // Dexterous
            '893869F6': { health:20, resolve:10,                                  }, // Disciple of Davkul
            'A0CF9774': { resolve:5, meleeSkill:-5, rangedSkill:-10,              }, // Drunkard
            '5065D234': { resolve:-5,                                             }, // Fainthearted
            '5A92A3F2': { resolve:5,                                              }, // Fanatic of Davkul
            'B4A3C9D5': { health:10, fatigue:-10,                                 }, // Fat
            '6AD5327F': { resolve:10,                                             }, // Fearless
            '0B0E08CE': { health:-10,                                             }, // Fragile
            '494312EC': { initiative:-10,                                         }, // Hesitant
            'DA78B736': { meleeDefense:-5, rangedDefense:-5,                      }, // Huge
            '9CA0EBB9': { resolve:10, health:-10, fatigue:-10, initiative:-10,    }, // Old
            '0756CE67': { meleeDefense:5, rangedDefense:5, initiative:-30,        }, // Paranoid
            'DA1D1224': { resolve:10,                                             }, // Player Character
            '2EBB3F39': { health:20, resolve:10, meleeDefense:5, rangedDefense:5, }, // Prophet of Davkul
            'C2C1134F': { initiative:10,                                          }, // Quick
            '1ED3819C': { fatigue:10,                                             }, // Strong
            '9D81C274': { meleeDefense:5,                                         }, // Sure Footing
            '767F08BC': { rangedDefense:5,                                        }, // Swift
            '994FE708': { meleeDefense:5, rangedDefense:5,                        }, // Tiny
            'B4760E9D': { health:10,                                              }, // Tough
            '635178DF': { resolve:10,                                             }, // Zealot of Davkul
            'F741B943': { health:50,                                              }, // Bog King's Draught
          }[t]?.[_[3]] || 0;
        });

        var bi = m(s(b.i));
        if (_[3] == 'resolve') bi.forEach(_ => i += { '98FF91E9':10, 'AA50E303':6, '3FF4678E':5, 'ED4D7672':4, '8E6BFC1C':7, '63861E21':10 }[_] || 0);
        if (_[3] == 'resolve' && bi.includes('2468BB8C')) f *= 1.25;
        if (_[3] == 'health'  && bi.includes('4C867685')) f *= 1.25;
        v.innerText = (''+i*f).replace(/\..*/,'.');
      };
      v.onclick = e => {
        var x = prompt(_[3][0].toUpperCase() + _[3].slice(1).replace(/([A-Z])/, ' $1') + '?', v.title);
        if (x == null) return;

        b.a = b.a || [];
        b.a[0] = s(b.a[0]);
        v.title = parseInt(b.a[0][_[0]] = (+x || 0).toString(36).padStart(2,0).slice(0,2), 36);
        b.a[0] = [...b.a[0]].map(_ => _ || '00').join('');
        v.update();
      };
      v.update();

      c('','span');
      if (b.a?.[2]) {
        var $ = (b.a[2].length - 1) / 8;
        parseInt(b.a[2].slice($ * _[1] + 1, $ * (_[1] + 1) + 1), 36)
          .toString(4).padStart(parseInt(b.a[2][0], 16), 0)
          .split('').map($ => +$ + _[2]).join('')
          .padStart(10,0).split('')
          .forEach((a,i) => {
            var e = c(a,'span','talent');
            e.previousSibling.append(e);
            if (a == 0) return e.style.visibility = 'hidden';

            v.points.push([a,e]);
            e.onclick = $ => {
              var $ = s(b.a[3]).map(_ => parseInt(_,16) || 0);
              $[9-i] |= 1 << _[1];
              $[9-i] ^= !e.classList.toggle('selected') << _[1];
              b.a[3] = [...$].map(_ => (_||0).toString(16).padStart(2,0)).join('');
              v.update();

              var t = 0;
              var a = e.parentElement.parentElement.querySelectorAll('.talent:nth-child(' + (Array.from(e.parentElement.children).indexOf(e) + 1) + ')');
              a.forEach(_ => t += _.classList.contains('selected'));
              a.forEach(_ => _.style.background = (_.classList.contains('selected') && t != 3) ? 'red' : '');
            };

            if (parseInt(s(b.a[3])[9-i], 16) & (1 << _[1])) e.onclick();
          });
      }

      c('', 'div', {height:'14px'});
    });
  });

  if (!observer) {
    observer = new MutationObserver(_ => {
      if (document.body.lastChild != printFix) document.body.append(printFix);
      localStorage.setItem('brothers', toString(Array.from(document.querySelectorAll('body>div:has(.persist.yes)')).map(_ => _.b)));
    });

    draw([0]);
    count--;
    (printFix = document.body.lastChild).classList.add('printFix');
    observer.observe(document.body, { subtree:true, childList:true, attributes:true, characterData:true });
  }
}
