exports["test start with"] = function (assert) {

    var pattern = /(#[0-9]+\s)|(#[0-9]+(\s)?$)/;

    var strings = [
        {
            text: 'test 1 1111',
            value: ''
        },
        {
            text: 'test 2 #2222',
            value: '2222'
        },
        {
            text: '#3333 test 3',
            value: '3333'
        },
        {
            text: 'test #4444 4',
            value: '4444'
        }
    ];

    for (var i = 0; i < strings.length; i++) {
        var test = strings[i];
        var number = pattern.exec(test.text);

        if (number == null) {
            assert.equal('', test.value);

        } else if (typeof number[0] != 'undefined') {
            number = number[0].replace('#', '').trim();
            assert.equal(number, test.value);

        } else {
            assert.equal('', test.value);
        }
    }
};


exports["test start and end"] = function (assert) {

    var pattern = /#[0-9]+#/;

    var strings = [
        {
            text: 'test 1 1111',
            value: ''
        },
        {
            text: 'test 2 #2222#',
            value: '2222'
        },
        {
            text: '#3333# test 3',
            value: '3333'
        },
        {
            text: 'test #4444# 4',
            value: '4444'
        }
    ];

    for (var i = 0; i < strings.length; i++) {
        var test = strings[i];
        var number = pattern.exec(test.text);

        if (number == null) {
            assert.equal('', test.value);

        } else if (typeof number[0] != 'undefined') {
            number = number[0].replace(/#/g, '').trim();
            assert.equal(number, test.value);

        } else {
            assert.equal('', test.value);
        }
    }
};


exports["test all numbers"] = function (assert) {

    var pattern = /\d{2,}(?!\d*\))/;

    var strings = [
        {
            text: 'test 1',
            value: ''
        },
        {
            text: 'test 11',
            value: '11'
        },
        {
            text: '111',
            value: '111'
        },
        {
            text: 'test 2 2222',
            value: '2222'
        },
        {
            text: '3333 test 3',
            value: '3333'
        },
        {
            text: 'test 4444 4',
            value: '4444'
        },
        {
            text: 'test (5) 5555',
            value: '5555'
        }
        ,
        {
            text: 'test (66) 6666',
            value: '6666'
        },
        {
            text: 'test (77777) 77',
            value: '77'
        }
    ];

    for (var i = 0; i < strings.length; i++) {
        var test = strings[i];
        var number = pattern.exec(test.text);

        if (number == null) {
            assert.equal('', test.value);

        } else if (typeof number[0] != 'undefined') {
            number = number[0].trim();
            assert.equal(number, test.value);

        } else {
            assert.equal('', test.value);
        }
    }
};

require("sdk/test").run(exports);
