describe('#date()', () => {

  TODO()
  xit('invalid dates', () => {
    [
      "date('1983-09-31')",
      "date('not a date')",
      "date('opv_3')",
      "date(true())"
      //"date(convertible())"
    ].forEach( t => {
      let expr = t[ 0 ];
      assertFalse(expr)
      // do the same tests for the alias date-time()
      expr = expr.replace( 'date(', 'date-time(' );
      assertFalse(expr);
    });
  });


  describe('valid date string', () => {
    it('should be left alone', () => {
      assertString("date('1970-01-01')", '1970-01-01');
      assertString('date("2018-01-01")', '2018-01-01');
      assertString('"2018-01-01"', '2018-01-01');
      TODO()
      // assertString('"2018-01-01" + 1', 17533.29167); // converted to Number according to regular XPath rules
      // assertString('date("2018-01-01" + 1)', '2018-01-02'); // converted to Number according to regular XPath rules

      // it( 'dates as string', () => {
      //     [
      //         [  ],
      //         [  ], //T00:00:00.000-07:00'], // America/Phoenix
      //         [  ],
      //         [  ], //T00:00:00.000-07:00'],
      //     ].forEach( t => {
      //         const result = g.doc.evaluate( t[ 0 ], g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
      //         const r = typeof t[ 1 ] === 'number' ? Math.round( result.stringValue * 100000 ) / 100000 : result.stringValue;
      //         expect( r ).to.equal( t[ 1 ] );
      //     } );
      //
      //     [
      //         "today()",
      //         "date(today() + 10)",
      //         "date(10 + today())"
      //     ].forEach( t => {
      //         const result = g.doc.evaluate( t, g.doc, helpers.getXhtmlResolver( g.doc ), g.win.XPathResult.STRING_TYPE, null );
      //         expect( result.stringValue ).to.match( /([0-9]{4}-[0-9]{2}-[0-9]{2})$/ );
      //     } );
      // } );
    });
  });

  describe('date string with single-digit day or month values', () => {
    it('should insert zeroes', () => {
      assertString("date('1970-1-2')", '1970-01-02');
    });
  });

  describe('number', () => {
    _.forEach({
      'date(0)': '1970-01-01',
      'date(1)': '1970-01-02',
      'date(1.5)': '1970-01-02',
      'date(-1)': '1969-12-31',
    }, function(expected, expr) {
      it(expr + ' should be converted to ' + expected, () => {
        assertString(expr, expected);
      });
    });
  });

  describe('invalid date', () => {
    it('should not parse, but instead should return a String', () => {
      assertString("date('nonsense')", 'Invalid Date');
    });
  });

  describe('comparisons', () => {
    _.forEach({
        'date("2001-12-26") > date("2001-12-25")': true,
        'date("2001-12-26") < date("2001-12-25")': false,
        'date("1969-07-20") < date("1969-07-21")': true,
        'date("1969-07-20") > date("1969-07-21")': false,
        'date("2004-05-01") = date("2004-05-01")': true,
        'date("2004-05-01") != date("2004-05-01")': false,
        '"string" != date("1999-09-09")': true,
        '"string" = date("1999-09-09")': false,
        'date(0) = date("1970-01-01")': true,
        'date(0) != date("1970-01-01")': false,
        'date(1) = date("1970-01-02")': true,
        'date(1) != date("1970-01-02")': false,
        'date(-1) = date("1969-12-31")': true,
        'date(-1) != date("1969-12-31")': false,
        'date(14127) = date("2008-09-05")': true,
        'date(14127) != date("2008-09-05")': false,
        'date(-10252) = date("1941-12-07")': true,
        'date(-10252) != date("1941-12-07")': false,
        'date("2012-01-01") < today()': true,
        'date("2012-01-01") > today()': false,
        'date("2100-01-02") > today()': true,
        'date("2100-01-02") < today()': false,
    }, function(expected, expr) {
      it('should evaluate \'' + expr + '\' to: ' + expected, () => {
        assert.equal(xEval(expr).booleanValue, expected);
      });
    });
  });

  describe('math', () => {
    _.forEach({
        'date("2001-12-26") + 5': '2001-12-31',
        'date("2001-12-26") - 5': '2001-12-21',
        '5 + date("2001-12-26")': '2001-12-31',
        '-5 + date("2001-12-26")': '2001-12-21',
        '3 + date("2001-12-26") + 5': '2002-01-03',
        '3 + date("2001-12-26") - 5': '2001-12-24',
    }, function(expected, expr) {
      it('should evaluate \'' + expr + '\' to: ' + expected, () => {
        assertString(expr, expected);
      });
    });
  });

  xit('datetimes as string', () => {
    [
      "now()",
    ].forEach( t => {
      const result = xEval(t);
      expect(result.stringValue).to.match( /([0-9]{4}-[0-9]{2}-[0-9]{2})([T]|[\s])([0-9]){2}:([0-9]){2}([0-9:.]*)(\+|-)([0-9]{2}):([0-9]{2})$/ );
    });
  });

  xit( 'converts dates to numbers', () => {
    [
      [ "number(date('1970-01-01'))", 0.29 ],
      [ "number(date('1970-01-02'))", 1.29 ],
      [ "number(date('1969-12-31'))", -0.71 ],
      [ "number(date('2008-09-05'))", 14127.29 ],
      [ "number(date('1941-12-07'))", -10251.71 ],
      [ "number('2008-09-05')", 14127.29 ],
      [ "number( 1 div 1000000000 )", 0 ]
    ].forEach( t => {
      const result = xEval(t[0]);
      const roundedResult = Math.round(result.numberValue * 100) / 100;
      expect(roundedResult).to.equal(t[1]);
    });
  });

  xit('for nodes (where the date datatype is guessed)', () => {
    initDoc(`
      <div id="FunctionDate">
  			<div id="FunctionDateCase1">2012-07-23</div>
  			<div id="FunctionDateCase2">2012-08-20T00:00:00.00+00:00</div>
  			<div id="FunctionDateCase3">2012-08-08T00:00:00+00:00</div>
  			<div id="FunctionDateCase4">2012-06-23</div>
  			<div id="FunctionDateCase5">2012-08-08T06:07:08.123-07:00</div>
  		</div>`);
    [
      [ ".", doc.getElementById("FunctionDateCase1"), 15544.29 ],
      [ ".", doc.getElementById("FunctionDateCase2"), 15572 ]
    ].forEach( t => {
      const result = xEval(t[0], t[1]);
      const roundedResult = Math.round(result.numberValue * 100) / 100;
      expect(roundedResult).to.equal(t[2]);
    });
  });

  xit( 'datetype comparisons', () => {
    [
      [ "date('2001-12-26') > date('2001-12-25')", true ],
      [ "date('1969-07-20') < date('1969-07-21')", true ],
      [ "date('2004-05-01') = date('2004-05-01')", true ],
      [ "true() != date('1999-09-09T00:00:00.000+00:00')", false ],
      [ "date(0) = date('1970-01-01T00:00:00.000+00:00')", true ],
      [ "date(1) = date('1970-01-02T00:00:00.000+00:00')", true ],
      [ "date(-1) = date('1969-12-31T00:00:00.000+00:00')", true ],
      [ "date(14127) = date('2008-09-05T00:00:00.000+00:00')", true ],
      [ "date(-10252) = date('1941-12-07T00:00:00.000+00:00')", true ],
      [ "date(date('1989-11-09')) = date('1989-11-09')", true ],
      [ "date('2012-01-01') < today()", true ],
      [ "date('2100-01-02') > today()", true ],
      [ "date('2012-01-01') < now()", true ],
      [ "date('2100-01-02') > now()", true ],
      [ "now() > today()", true ],
      //['today() = "2018-06-26"', true],
      [ '"2018-06-25" = "2018-06-25T00:00:00.000-07:00"', true ],
      [ '"2018-06-25" < "2018-06-25T00:00:00.000-07:00"', false ],
      [ '"2018-06-25" < "2018-06-25T00:00:00.001-07:00"', true ],
    ].forEach( t => {
      let expr = t[0];
      assertBoolean(expr, t[1]);
      // do the same tests for the alias date-time()
      expr = expr.replace( 'date(', 'date-time(' );
      assertBoolean(expr, t[1]);
    });
  });

  xit( 'datestring comparisons (date detection)', () => {
    initDoc(`
      <div id="FunctionDate">
  			<div id="FunctionDateCase1">2012-07-23</div>
  			<div id="FunctionDateCase2">2012-08-20T00:00:00.00+00:00</div>
  			<div id="FunctionDateCase3">2012-08-08T00:00:00+00:00</div>
  			<div id="FunctionDateCase4">2012-06-23</div>
  			<div id="FunctionDateCase5">2012-08-08T06:07:08.123-07:00</div>
  		</div>`);
    [
      [ ". < date('2012-07-24')", doc.getElementById( "FunctionDateCase1" ), true ],
      //returns false if strings are compared but true if dates are compared
      [ "../node()[@id='FunctionDateCase2'] > ../node()[@id='FunctionDateCase3']", doc.getElementById( "FunctionDateCase1" ), true ]
    ].forEach( t => {
      let expr = t[ 0 ];
      assertBoolean(t[1], null, expr, t[2]);
      // do the same tests for the alias date-time()
      expr = expr.replace( 'date(', 'date-time(' );
      assertBoolean(t[1], null, expr, t[2]);
    });
  });

  xit( 'date calculations', () => {
    [
      [ "today() > ('2012-01-01' + 10)", doc, true ],
      [ "10 + date('2012-07-24') = date('2012-08-03')", doc, true ],
      [ ". = date('2012-07-24') - 1", doc.getElementById( "FunctionDateCase1" ), true ],
      [ ". > date('2012-07-24') - 2", doc.getElementById( "FunctionDateCase1" ), true ],
      [ ". < date('2012-07-25') - 1", doc.getElementById( "FunctionDateCase1" ), true ],
      [ ". = 30 + /xhtml:html/xhtml:body/xhtml:div[@id='FunctionDate']/xhtml:div[@id='FunctionDateCase4']", g.doc.getElementById( "FunctionDateCase1" ), true ],
      [ "10 + '2012-07-24' = '2012-08-03'", g.doc, true ]
    ].forEach( t => {
      let expr = t[0];
      assertBoolean(t[1], null, expr, t[2]);
      // do the same tests for the alias date-time()
      expr = expr.replace( 'date(', 'date-time(' );
      assertBoolean(t[1], null, expr, t[2]);
    });

    [
      [ "10 + date('2012-07-24')", doc, 15555.29 ]
    ].forEach( t => {
      let expr = t[0];
      let result = xEval(expr, t[1]);
      let roundedResult = Math.round( result.numberValue * 100 ) / 100;
      expect(roundedResult).to.equal(t[2]);
      // do the same tests for the alias date-time()
      expr = expr.replace( 'date(', 'date-time(' );
      result = xEval(expr, t[1]);
      roundedResult = Math.round( result.numberValue * 100 ) / 100;
      expect(roundedResult).to.equal(t[2]);
    });
  });
});
