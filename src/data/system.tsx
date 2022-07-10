export const sun = {
    name : `Sun`,
    symbol : `☉`,
    radius : 696_342,
    mass : 1.9885e30,
    obliquity : radians(7.25),
}
export const mercury = {
    name : `Mercury`,
    symbol : `☿`,
    radius : 2_439.7,
    mass : 3.3011e23,
    obliquity : radians(0.03),
}
export const venus = {
    name : `Venus`,
    symbol : `♀`,
    radius : 6_051.8,
    mass : 4.8675e24,
    obliquity : radians(2.64),
}
export const earth = {
    name : `Earth`,
    symbol : `🜨`,
    radius : 6_371.0,
    mass : 5.97237e24,
    obliquity : radians(23.44),
    moons : [
        {   name : `Moon`,
            symbol : `☾`,
            radius : 1_737.4,
            mass : 7.342e22,
            obliquity : radians(6.687),
        },
    ],
}
export const mars = {
    name : `Mars`,
    symbol : `♂`,
    radius : 3_389.5,
    mass : 6.4171e23,
    obliquity : radians(25.19),
    moons : [
        {   name : `Phobos`,
            radius : 22.2,
            mass : 10.8e15,
            obliquity : radians(0),
        },
        {   name : `Deimos`,
            radius : 12.6,
            mass : 1.5e15,
            obliquity : radians(0),
        },
    ],
}
export const jupiter = {
    name : `Jupiter`,
    symbol : `♃`,
    radius : 69_911,
    mass : 1.8982e27,
    obliquity : radians(3.13),
    rings : [
        {
            name : `Halo Ring`,
            radius : 92_000,
            width : 30_000,
        },
        {
            name : `Main Ring`,
            radius : 122_500,
            width : 6_500,
        },
        // {
        //     name : `Amalthea gossamer Ring`,
        //     radius : 129_000,
        //     width : 53_000,
        // },
        // {
        //     name : `Thebe gossamer Ring`,
        //     radius : 129_000,
        //     width : 97_000,
        // },
    ],
    moons : [
        {   name : `Metis`,
            radius : 43,
            mass : 3.6e16,
            obliquity : radians(0),
        },
        {   name : `Adrastea`,
            radius : 16,
            mass : 40.20e16,
            obliquity : radians(0),
        },
        {   name : `Amalthea`,
            radius : 167,
            mass : 208e16,
            obliquity : radians(0),
        },
        {   name : `Thebe`,
            radius : 98,
            mass : 643e16,
            obliquity : radians(0),
        },
        {   name : `Io`,
            radius : 3643,
            mass : 28_931_900e16,
            obliquity : radians(0),
        },
        {   name : `Europa`,
            radius : 3121,
            mass : 64_799_800e16,
            obliquity : radians(0),
        },
        {   name : `Ganymede`,
            radius : 5268,
            mass : 214_819_000e16,
            obliquity : radians(0),
        },
        {   name : `Callisto`,
            radius : 4820,
            mass : 610_759_000e16,
            obliquity : radians(0),
        },
        {   name : `Themisto`,
            radius : 9,
            mass : 0.038e16,
            obliquity : radians(0),
        },
        {   name : `Leda`,
            radius : 21,
            mass : 50.52e16,
            obliquity : radians(0),
        },
        {   name : `Ersa`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Himalia`,
            radius : 139,
            mass : 6_420e16,
            obliquity : radians(0),
        },
        {   name : `Pandia`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Lysithea`,
            radius : 42,
            mass : 23.9e16,
            obliquity : radians(0),
        },
        {   name : `Elara`,
            radius : 79,
            mass : 927e16,
            obliquity : radians(0),
        },
        {   name : `Dia`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Carpo`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Valetudo`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `Euporie`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 18`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Eupheme`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2010 J 2`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `S/2016 J 1`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `Mneme`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Euanthe`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 16`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Harpalyke`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Orthosie`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Helike`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Praxidike`,
            radius : 7,
            mass : 0.018e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 3`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 12`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 7`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Thelxinoe`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Thyone`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 2`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Ananke`,
            radius : 29.1,
            mass : 1.3e16,
            obliquity : radians(0),
        },
        {   name : `Iocaste`,
            radius : 5,
            mass : 0.0065e16,
            obliquity : radians(0),
        },
        {   name : `Hermippe`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 9`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Philophrosyne`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Pasithee`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 8`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 24`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Eurydome`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `S/2011 J 2`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 4`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Chaldene`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 2`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Isonoe`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Kallichore`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Erinome`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Kale`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Eirene`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Aitne`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Eukelade`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Arche`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Taygete`,
            radius : 5,
            mass : 0.0065e16,
            obliquity : radians(0),
        },
        {   name : `S/2011 J 1`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Carme`,
            radius : 46.7,
            mass : 5.3e16,
            obliquity : radians(0),
        },
        {   name : `Herse`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 19`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2010 J 1`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 9`,
            radius : 1,
            mass : 0.000052e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 5`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 6`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Kalyke 6`,
            radius : 9,
            mass : 0.017e16,
            obliquity : radians(0),
        },
        {   name : `Hegemone`,
            radius : 3,
            mass : 0.0014e16,
            obliquity : radians(0),
        },
        {   name : `Pasiphae`,
            radius : 57.8,
            mass : 10e16,
            obliquity : radians(0),
        },
        {   name : `Sponde`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 10`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Megaclite`,
            radius : 5,
            mass : 0.0065e16,
            obliquity : radians(0),
        },
        {   name : `Cyllene`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Sinope`,
            radius : 35,
            mass : 2.2e16,
            obliquity : radians(0),
        },
        {   name : `S/2017 J 1`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Aoede`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Autonoe`,
            radius : 4,
            mass : 0.0034e16,
            obliquity : radians(0),
        },
        {   name : `Callirrhoe 9`,
            radius : 6,
            mass : 0.046e16,
            obliquity : radians(0),
        },
        {   name : `S/2003 J 23`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
        {   name : `Kore`,
            radius : 2,
            mass : 0.00042e16,
            obliquity : radians(0),
        },
    ].map(moon => ({ ...moon, radius : moon.radius / 2 })),
}
export const saturn = {
    name : `Saturn`,
    symbol : `♄`,
    radius : 58_232,
    mass : 5.6834e26,
    obliquity : radians(26.73),
    rings : [
        {
            name : `D Ring`,
            radius : 66_900,
            width : 7_500,
        },
        {
            name : `C Ring`,
            radius : 74_658,
            width : 17_500,
        },
        {
            name : `B Ring`,
            radius : 92_000,
            width : 25_500,
        },
        {
            name : `A Ring`,
            radius : 122_170,
            width : 14_600,
        },
        {
            name : `F Ring`,
            radius : 140_180,
            width : 500,
        },
        {
            name : `Janus/Epimetheus Ring`,
            radius : 149_000,
            width : 5_000,
        },
        {
            name : `G Ring`,
            radius : 166_000,
            width : 9_000,
        },
        {
            name : `Methone Ring Arc`,
            radius : 194_230,
            width : 1_000,
        },
        {
            name : `Anthe Ring Arc`,
            radius : 197_655,
            width : 1_000,
        },
        {
            name : `Pallene Ring`,
            radius : 211_000,
            width : 2_500,
        },
        // {
        //     name : `E Ring`,
        //     radius : 180_000,
        //     width : 300_000,
        // },
    ],
    moons : [
        {
            name: `S/2009 S 1`,
            radius: 0.30,
            mass: 0.00000001e15,
            obliquity : radians(0),
        },
        {
            name: `(moonlets)`,
            radius: (0.04 + 0.4) / 2,
            mass: 0.00000002e15,
            obliquity : radians(0),
        },
        {
            name: `Pan`,
            radius: 28.2,
            mass: 5.0e15,
            obliquity : radians(0),
        },
        {
            name: `Daphnis`,
            radius: 7.6,
            mass: 0.077e15,
            obliquity : radians(0),
        },
        {
            name: `Atlas`,
            radius: 30.2,
            mass: 6.6e15,
            obliquity : radians(0),
        },
        {
            name: `Prometheus`,
            radius: 86.2,
            mass: 159.5e15,
            obliquity : radians(0),
        },
        {
            name: `Pandora`,
            radius: 81.4,
            mass: 137.1e15,
            obliquity : radians(0),
        },
        {
            name: `Epimetheus`,
            radius: 116.2,
            mass: 526.6e15,
            obliquity : radians(0),
        },
        {
            name: `Janus`,
            radius: 179.0,
            mass: 1897.5e15,
            obliquity : radians(0),
        },
        {
            name: `Aegaeon`,
            radius: 0.66,
            mass: 0.000073e15,
            obliquity : radians(0),
        },
        {
            name: `Mimas`,
            radius: 396.4,
            mass: 37_493e15,
            obliquity : radians(0),
        },
        {
            name: `Methone`,
            radius: 2.9,
            mass: 0.0063e15,
            obliquity : radians(0),
        },
        {
            name: `Anthe`,
            radius: 1.0,
            mass: 0.00026e15,
            obliquity : radians(0),
        },
        {
            name: `Pallene`,
            radius: 4.4,
            mass: 0.023e15,
            obliquity : radians(0),
        },
        {
            name: `Enceladus`,
            radius: 504.2,
            mass: 108_022e15,
            obliquity : radians(0),
        },
        {
            name: `Tethys`,
            radius: 1062.2,
            mass: 617_449e15,
            obliquity : radians(0),
        },
        {
            name: `Telesto`,
            radius: 24.8,
            mass: 4.0e15,
            obliquity : radians(0),
        },
        {
            name: `Calypso`,
            radius: 21.4,
            mass: 2.5e15,
            obliquity : radians(0),
        },
        {
            name: `Dione`,
            radius: 1122.8,
            mass: 1_095_452e15,
            obliquity : radians(0),
        },
        {
            name: `Helene`,
            radius: 35.2,
            mass: 7.2e15,
            obliquity : radians(0),
        },
        {
            name: `Polydeuces`,
            radius: 2.6,
            mass: 0.0038e15,
            obliquity : radians(0),
        },
        {
            name: `Rhea`,
            radius: 1527.6,
            mass: 2_306_518e15,
            obliquity : radians(0),
        },
        {
            name: `Titan`,
            radius: 5149.46,
            mass: 134_520_000e15,
            obliquity : radians(0),
        },
        {
            name: `Hyperion`,
            radius: 270.0,
            mass: 5_619.9e15,
            obliquity : radians(0),
        },
        {
            name: `Iapetus`,
            radius: 1468.6,
            mass: 1_805_635e15,
            obliquity : radians(0),
        },
        {
            name: `S/2019 S 1`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Kiviuq`,
            radius: 17,
            mass: 2.6e15,
            obliquity : radians(0),
        },
        {
            name: `Ijiraq`,
            radius: 13,
            mass: 1.2e15,
            obliquity : radians(0),
        },
        {
            name: `Phoebe`,
            radius: 213.0,
            mass: 8_292.0e15,
            obliquity : radians(0),
        },
        {
            name: `Paaliaq`,
            radius: 25,
            mass: 8.2e15,
            obliquity : radians(0),
        },
        {
            name: `Skathi`,
            radius: 8,
            mass: 0.27e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 37`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Albiorix`,
            radius: 28.6,
            mass: 12.2e15,
            obliquity : radians(0),
        },
        {
            name: `S/2007 S 2`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 29`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Bebhionn`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 31`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Erriapus`,
            radius: 10,
            mass: 0.52e15,
            obliquity : radians(0),
        },
        {
            name: `Skoll`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Tarqeq`,
            radius: 7,
            mass: 0.18e15,
            obliquity : radians(0),
        },
        {
            name: `Siarnaq`,
            radius: 39.3,
            mass: 31.8e15,
            obliquity : radians(0),
        },
        {
            name: `Tarvos`,
            radius: 15,
            mass: 1.8e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 13`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Hyrrokkin`,
            radius: 8,
            mass: 0.27e15,
            obliquity : radians(0),
        },
        {
            name: `Greip`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Mundilfari`,
            radius: 7,
            mass: 0.18e15,
            obliquity : radians(0),
        },
        {
            name: `S/2006 S 1`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `S/2007 S 3`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 20`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Bergelmir`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Narvi`,
            radius: 7,
            mass: 0.18e15,
            obliquity : radians(0),
        },
        {
            name: `Jarnsaxa`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 17`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Suttungr`,
            radius: 7,
            mass: 0.18e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 27`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Hati`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 12`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Bestla`,
            radius: 7,
            mass: 0.18e15,
            obliquity : radians(0),
        },
        {
            name: `Farbauti`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Thrymr`,
            radius: 8,
            mass: 0.27e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 22`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 30`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `Aegir`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 25`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 7`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 32`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 23`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 28`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 35`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Kari`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 38`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `S/2006 S 3`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Fenrir`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `Surtur`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `Loge`,
            radius: 5,
            mass: 0.065e15,
            obliquity : radians(0),
        },
        {
            name: `Ymir`,
            radius: 19,
            mass: 3.6e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 21`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 39`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 24`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 36`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `£S/2004 S 33`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
        {
            name: `£S/2004 S 34`,
            radius: 3,
            mass: 0.014e15,
            obliquity : radians(0),
        },
        {
            name: `Fornjot`,
            radius: 6,
            mass: 0.11e15,
            obliquity : radians(0),
        },
        {
            name: `S/2004 S 26`,
            radius: 4,
            mass: 0.034e15,
            obliquity : radians(0),
        },
    ].map(moon => ({ ...moon, radius : moon.radius / 2 })),
}
export const uranus = {
    name : `Uranus`,
    symbol : `⛢`,
    radius : 25_362,
    mass : 8.6810e25,
    obliquity : radians(82.23),
    rings : [
        {   name : `cc`,
            radius : 26_840,
            width : 8_000,
        },
        {   name : `ζc`,
            radius : 34_890,
            width : 3_000,
        },
        {   name : `1986U2R`,
            radius : 37_000,
            width : 2_500,
        },
        {   name : `ζ`,
            radius : 37_850,
            width : 3_500,
        },
        {   name : `6`,
            radius : 41_837,
            width : Math.abs((1.6 - 2.2) / 2),
        },
        {   name : `5`,
            radius : 42_234,
            width : Math.abs((1.9 - 4.9) / 2),
        },
        {   name : `4`,
            radius : 42_570,
            width : Math.abs((2.4 - 4.4) / 2),
        },
        {   name : `α`,
            radius : 44_718,
            width : Math.abs((4.8 - 10.0) / 2),
        },
        {   name : `β`,
            radius : 45_661,
            width : Math.abs((6.1 - 11.4) / 2),
        },
        {   name : `η`,
            radius : 47_175,
            width : Math.abs((1.9 - 2.7) / 2),
        },
        {   name : `ηc`,
            radius : 47_176,
            width : 40,
        },
        {   name : `γ`,
            radius : 47_627,
            width : Math.abs((3.6 - 4.7) / 2),
        },
        {   name : `δc`,
            radius : 48_300,
            width : Math.abs((10 - 12) / 2),
        },
        {   name : `δ`,
            radius : 48_300,
            width : Math.abs((4.1 - 6.1) / 2),
        },
        {   name : `λ`,
            radius : 50_023,
            width : Math.abs((1 - 2) / 2),
        },
        {   name : `ε`,
            radius : 51_149,
            width : Math.abs((19.7 - 96.4) / 2),
        },
        {   name : `ν`,
            radius : 66_100,
            width : 3_800,
        },
        {   name : `μ`,
            radius : 86_000,
            width : 17_000,
        },
    ],
}
export const neptune = {
    name : `Neptune`,
    symbol : `♆`,
    radius : 24_622,
    mass : 1.02413e26,
    obliquity : radians(28.32),
    rings : [
        {   name : `Galle (N42)`,
            radius : 40_900,
            width : 2_000,
        },
        {   name : `Le Verrier (N53)`,
            radius : 53_200,
            width : 113,
        },
        {   name : `Lassell`,
            radius : 53_200,
            width : 4_000,
        },
        {   name : `Arago`,
            radius : 57_200,
            width : 100,
        },
        {   name : `Adams (N63)`,
            radius : 62_932,
            width : Math.abs((15 - 50) / 2),
        },
    ],
}

const system : System = {
    star : sun,
    planets : [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
    ],
}

export default system

export type System = {
    star : Star
    planets : Planet[]
}
export type Star = Celestial
export type Planet = Celestial & {
    rings? : Ring[]
    moons? : Moon[]
}
export type Moon = Celestial
export type Ring = {
    name : string
    radius : number
    width : number
}
export type Celestial = {
    name : string
    symbol? : string
    /** Radius in km */
    radius : number
    /** Mass in kg */
    mass : number
    /** See [axial tilt](https://en.wikipedia.org/wiki/Axial_tilt) */
    obliquity : number
}

function radians(degrees : number) {
    return degrees / 180 * Math.PI
}
