
function $() {

}

function init() {
    document.getElementById("base58testbtn").addEventListener("click", doBase58Test);
    document.getElementById("base58ctestbtn").addEventListener("click", doBase58cTest);
}

function doBase58Test() {
    document.getElementById("result").innerHTML = "";
    log("BASE58 TEST BEGIN");
    try {
        for (let v of BASE58_TEST_VECTOR) {
            let r = false;
            r = v[1] === Base58.encode(v[0]);
            log(v[0] + " -> " + v[1] + " = " + r);
            if (!r) {
                log("NG! Encode: " + v[1] + " != " + Base58.encode(v[0]));
                break;
            }
            r = v[0] === Base58.decode(v[1]);
            log(v[1] + " -> " + v[0] + " = " + r);
            if (!r) {
                log("NG! Decode: " + v[0] + " != " + Base58.decode(v[1]));
                break;
            }
        }
    } catch (e) {
        log("Error:" + e.message);
    }
    log("BASE58 TEST END");
}

function doBase58cTest() {
    document.getElementById("result").innerHTML = "";
    log("BASE58C TEST BEGIN");
    try {
        let base58 = new Base58();
        for (let t of BASE58C_TEST_VECTOR) {
            let r = false;
            let v = parseInt(t[2], 10);
            let vh = "";
            if (v < 0x10) {
                vh = "0" + v.toString(16);
            } else {
                vh = v.toString(16);
            }
            r = t[0] === Base58.checkEncode(t[1], vh);
            log(vh + t[1] + " -> " + t[0] + " = " + r);
            if (!r) {
                log("NG! checkEncode: " + t[0] + " != " +  Base58.checkEncode(t[1], vh));
                break;
            }
            let cd = Base58.checkDecode(t[0]);
            r = (t[1] === cd[0]) && (vh === cd[1]);
            log(t[0] + " -> " + vh + t[1] + " = " + r);
            if (!r) {
                log("NG! checkDecode: " + t[0] + " != " + cd);
                break;
            }
        }
    } catch (e) {
        log("Error:" + e.message);
    }
    log("BASE58C TEST END");
}

function log(msg) {
    let p = document.getElementById("result");
    let e = document.createElement("div");
    e.innerText = JSON.stringify(new Date(new Date().getTime() + 9 * 60 * 60 * 1000)).substring(12, 24) + " " + msg;
    p.insertBefore(e, p.firstChild);
}

// https://github.com/bitcoin/bitcoin/blob/master/src/test/data/base58_encode_decode.json
const BASE58_TEST_VECTOR = [
    ["", ""],
    ["61", "2g"],
    ["626262", "a3gV"],
    ["636363", "aPEr"],
    ["73696d706c792061206c6f6e6720737472696e67", "2cFupjhnEsSn59qHXstmK2ffpLv2"],
    ["00eb15231dfceb60925886b67d065299925915aeb172c06647", "1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L"],
    ["516b6fcd0f", "ABnLTmg"],
    ["bf4f89001e670274dd", "3SEo3LWLoPntC"],
    ["572e4794", "3EFU7m"],
    ["ecac89cad93923c02321", "EJDM8drfXA6uyA"],
    ["10c8511e", "Rt5zm"],
    ["00000000000000000000", "1111111111"]
];

// https://github.com/dartcoin/base58check/blob/master/test/base58check_test.dart
const BASE58C_TEST_VECTOR = [
    [
        "1AGNa15ZQXAZUgFiqJ2i7Z2DPU2J6hW62i",
        "65a16059864a2fdbc7c99a4723a8395bc6f188eb",
        "0"
    ],
    [
        "3CMNFxN1oHBc4R1EpboAL5yzHGgE611Xou",
        "74f209f6ea907e2ea48f74fae05782ae8a665257",
        "5"
    ],
    [
        "mo9ncXisMeAoXwqcV5EWuyncbmCcQN4rVs",
        "53c0307d6851aa0ce7825ba883c6bd9ad242b486",
        "111"
    ],
    [
        "2N2JD6wb56AfK4tfmM6PwdVmoYk2dCKf4Br",
        "6349a418fc4578d10a372b54b45c280cc8c4382f",
        "196"
    ],
    [
        "5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr",
        "eddbdc1168f1daeadbd3e44c1e3f8f5a284c2029f78ad26af98583a499de5b19",
        "128"
    ],
    [
        "9213qJab2HNEpMpYNBa7wHGFKKbkDn24jpANDs2huN3yi4J11ko",
        "36cb93b9ab1bdabf7fb9f2c04f1b9cc879933530ae7842398eef5a63a56800c2",
        "239"
    ],
    [
        "1Ax4gZtb7gAit2TivwejZHYtNNLT18PUXJ",
        "6d23156cbbdcc82a5a47eee4c2c7c583c18b6bf4",
        "0"
    ],
    [
        "3QjYXhTkvuj8qPaXHTTWb5wjXhdsLAAWVy",
        "fcc5460dd6e2487c7d75b1963625da0e8f4c5975",
        "5"
    ],
    [
        "n3ZddxzLvAY9o7184TB4c6FJasAybsw4HZ",
        "f1d470f9b02370fdec2e6b708b08ac431bf7a5f7",
        "111"
    ],
    [
        "2NBFNJTktNa7GZusGbDbGKRZTxdK9VVez3n",
        "c579342c2c4c9220205e2cdc285617040c924a0a",
        "196"
    ],
    [
        "5K494XZwps2bGyeL71pWid4noiSNA2cfCibrvRWqcHSptoFn7rc",
        "a326b95ebae30164217d7a7f57d72ab2b54e3be64928a19da0210b9568d4015e",
        "128"
    ],
    [
        "93DVKyFYwSN6wEo3E2fCrFPUp17FtrtNi2Lf7n4G3garFb16CRj",
        "d6bca256b5abc5602ec2e1c121a08b0da2556587430bcf7e1898af2224885203",
        "239"
    ],
    [
        "1C5bSj1iEGUgSTbziymG7Cn18ENQuT36vv",
        "7987ccaa53d02c8873487ef919677cd3db7a6912",
        "0"
    ],
    [
        "3AnNxabYGoTxYiTEZwFEnerUoeFXK2Zoks",
        "63bcc565f9e68ee0189dd5cc67f1b0e5f02f45cb",
        "5"
    ],
    [
        "n3LnJXCqbPjghuVs8ph9CYsAe4Sh4j97wk",
        "ef66444b5b17f14e8fae6e7e19b045a78c54fd79",
        "111"
    ],
    [
        "2NB72XtkjpnATMggui83aEtPawyyKvnbX2o",
        "c3e55fceceaa4391ed2a9677f4a4d34eacd021a0",
        "196"
    ],
    [
        "5KaBW9vNtWNhc3ZEDyNCiXLPdVPHCikRxSBWwV9NrpLLa4LsXi9",
        "e75d936d56377f432f404aabb406601f892fd49da90eb6ac558a733c93b47252",
        "128"
    ],
    [
        "927CnUkUbasYtDwYwVn2j8GdTuACNnKkjZ1rpZd2yBB1CLcnXpo",
        "44c4f6a096eac5238291a94cc24c01e3b19b8d8cef72874a079e00a242237a52",
        "239"
    ],
    [
        "1Gqk4Tv79P91Cc1STQtU3s1W6277M2CVWu",
        "adc1cc2081a27206fae25792f28bbc55b831549d",
        "0"
    ],
    [
        "33vt8ViH5jsr115AGkW6cEmEz9MpvJSwDk",
        "188f91a931947eddd7432d6e614387e32b244709",
        "5"
    ],
    [
        "mhaMcBxNh5cqXm4aTQ6EcVbKtfL6LGyK2H",
        "1694f5bc1a7295b600f40018a618a6ea48eeb498",
        "111"
    ],
    [
        "2MxgPqX1iThW3oZVk9KoFcE5M4JpiETssVN",
        "3b9b3fd7a50d4f08d1a5b0f62f644fa7115ae2f3",
        "196"
    ],
    [
        "5HtH6GdcwCJA4ggWEL1B3jzBBUB8HPiBi9SBc5h9i4Wk4PSeApR",
        "091035445ef105fa1bb125eccfb1882f3fe69592265956ade751fd095033d8d0",
        "128"
    ],
    [
        "92xFEve1Z9N8Z641KQQS7ByCSb8kGjsDzw6fAmjHN1LZGKQXyMq",
        "b4204389cef18bbe2b353623cbf93e8678fbc92a475b664ae98ed594e6cf0856",
        "239"
    ],
    [
        "1JwMWBVLtiqtscbaRHai4pqHokhFCbtoB4",
        "c4c1b72491ede1eedaca00618407ee0b772cad0d",
        "0"
    ],
    [
        "3QCzvfL4ZRvmJFiWWBVwxfdaNBT8EtxB5y",
        "f6fe69bcb548a829cce4c57bf6fff8af3a5981f9",
        "5"
    ],
    [
        "mizXiucXRCsEriQCHUkCqef9ph9qtPbZZ6",
        "261f83568a098a8638844bd7aeca039d5f2352c0",
        "111"
    ],
    [
        "2NEWDzHWwY5ZZp8CQWbB7ouNMLqCia6YRda",
        "e930e1834a4d234702773951d627cce82fbb5d2e",
        "196"
    ],
    [
        "5KQmDryMNDcisTzRp3zEq9e4awRmJrEVU1j5vFRTKpRNYPqYrMg",
        "d1fab7ab7385ad26872237f1eb9789aa25cc986bacc695e07ac571d6cdac8bc0",
        "128"
    ],
    [
        "91cTVUcgydqyZLgaANpf1fvL55FH53QMm4BsnCADVNYuWuqdVys",
        "037f4192c630f399d9271e26c575269b1d15be553ea1a7217f0cb8513cef41cb",
        "239"
    ],
    [
        "19dcawoKcZdQz365WpXWMhX6QCUpR9SY4r",
        "5eadaf9bb7121f0f192561a5a62f5e5f54210292",
        "0"
    ],
    [
        "37Sp6Rv3y4kVd1nQ1JV5pfqXccHNyZm1x3",
        "3f210e7277c899c3a155cc1c90f4106cbddeec6e",
        "5"
    ],
    [
        "myoqcgYiehufrsnnkqdqbp69dddVDMopJu",
        "c8a3c2a09a298592c3e180f02487cd91ba3400b5",
        "111"
    ],
    [
        "2N7FuwuUuoTBrDFdrAZ9KxBmtqMLxce9i1C",
        "99b31df7c9068d1481b596578ddbb4d3bd90baeb",
        "196"
    ],
    [
        "5KL6zEaMtPRXZKo1bbMq7JDjjo1bJuQcsgL33je3oY8uSJCR5b4",
        "c7666842503db6dc6ea061f092cfb9c388448629a6fe868d068c42a488b478ae",
        "128"
    ],
    [
        "93N87D6uxSBzwXvpokpzg8FFmfQPmvX4xHoWQe3pLdYpbiwT5YV",
        "ea577acfb5d1d14d3b7b195c321566f12f87d2b77ea3a53f68df7ebf8604a801",
        "239"
    ],
    [
        "13p1ijLwsnrcuyqcTvJXkq2ASdXqcnEBLE",
        "1ed467017f043e91ed4c44b4e8dd674db211c4e6",
        "0"
    ],
    [
        "3ALJH9Y951VCGcVZYAdpA3KchoP9McEj1G",
        "5ece0cadddc415b1980f001785947120acdb36fc",
        "5"
    ]
];

window.addEventListener("load", init);