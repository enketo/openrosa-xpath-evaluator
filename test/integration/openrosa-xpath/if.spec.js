const { initDoc, assertStringValue } = require('../helpers');

describe('#if()', () => {
  it('should return first option if true', () => {
    assertStringValue('if(true(), "a", "b")', 'a');
    assertStringValue('if(true(), 5, "abc")', 5);
  });

  it('should return second option if false', () => {
    assertStringValue('if(false(), "a", "b")', 'b');
    assertStringValue('if(false(), 5, "abc")', 'abc');
    assertStringValue('if(6 > 7, 5, "abc")', 'abc');
    assertStringValue('if("", 5, "abc")', 'abc');
  });

  describe('should evaluate node', () => {
    const doc = initDoc(`
      <div id="FunctionChecklistCase">
        <div id="FunctionChecklistCaseNo">no</div>
        <div id="FunctionChecklistCaseEmpty"></div>
        <div id="FunctionChecklistCase0">0</div>
      </div>`);

    it(`should evaluate an existing node as true`, () => {
      const node = doc.getElementById('FunctionChecklistCaseEmpty');
      assertStringValue(node, null, 'if(self::node(), "exists", "does not exist")', 'exists');
    });

    it(`should evaluate a non-existing node as false`, () => {
      assertStringValue(null, null, 'if(/unreal, "exists", "does not exist")', 'does not exist');
    });

    it(`should evaluate an "and" expression that checks values of nodes (1)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" and /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    it(`should evaluate an "and" expression that checks values of nodes (2)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" and /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    it(`should evaluate an "and" expression that checks values of nodes (3)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" and /div/div[@id="FunctionChecklistCaseNo"] ="no", "yes", "no")', 'yes');
    });

    it(`should evaluate an "or" expression that checks values of nodes (1)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" or /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'no');
    });

    it(`should evaluate an "or" expression that checks values of nodes (2)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. = "0" or /div/div[@id="FunctionCheckListCaseEmpty"] != "", "yes", "no")', 'yes');
    });
    
    it(`should evaluate an "or" expression that checks values of nodes (3)`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(. != "0" or /div/div[@id="FunctionChecklistCaseNo"] ="no", "yes", "no")', 'yes');
    });

    it(`should evaluate true and false outcomes`, () => {
      const node = doc.getElementById('FunctionChecklistCase0');
      assertStringValue(node, null, 'if(false(), "yes", concat(/div/div[@id="FunctionChecklistCaseNo"], "-no"))', 'no-no');
    });
  });

  describe('should deal with nesting and lengthy or/and clauses', ()=> {

    const doc = initDoc(`
    <data>
      <a/>
      <b/>
      <c>1</c>
      <d>0</d>
    </data>`);

     // TODO: this is a lazy test taken directly from a real form. It probably should be removed the minimal test cases below it seem to be sufficient, but it will be helpful during bug fixing. None of these nodes exist in the doc.
     it(`long sequence of "and" clauses and nested if() with long sequence of "or clauses" (non-minimized test case)`, () => {
      assertStringValue(doc, null, 'if( /model/instance[1]/data/page-welcome/GRP_ELIG/AGE_IC ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/INC_TEMP ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/NO_SEV_ILLNESS ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/FU_POSSIBLE ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/SAMPLE_COL_POSSIBLE ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/PROVIDE_INFORM_CONSENT ="1" and /model/instance[1]/data/page-welcome/GRP_ELIG/FEVER_RESP ="1", "Eligible", if( /model/instance[1]/data/page-welcome/GRP_ELIG/AGE_IC ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/INC_TEMP ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/NO_SEV_ILLNESS ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/FU_POSSIBLE ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/SAMPLE_COL_POSSIBLE ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/PROVIDE_INFORM_CONSENT ="0" or /model/instance[1]/data/page-welcome/GRP_ELIG/FEVER_RESP ="0", "Not-Eligible", "nothing"))', 'nothing'); 
    });

    it(`sequence of "and" clauses and nested if() with sequence of "or" clauses (1)`, () => {
      assertStringValue(doc, null, 'if( /data/a ="1" and /data/b ="1", "Eligible", if( /data/a ="0" or /data/b ="0", "Not-Eligible", "nothing"))', 'nothing'); 
    });

    it(`sequence of "and" clauses and nested if() with sequence of "or" clauses (2)`, () => {
      assertStringValue(doc, null, 'if( /data/a ="1" and /data/c ="1", "Eligible", if( /data/a ="0" or /data/b ="0", "Not-Eligible", "nothing"))', 'Eligible'); 
    });

    it(`sequence of "and" clauses and nested if() with sequence of "or" clauses (3)`, () => {
      assertStringValue(doc, null, 'if( /data/c ="1" and /data/b ="1", "Eligible", if( /data/a ="0" or /data/b ="0", "Not-Eligible", "nothing"))', 'ELigible'); 
    });

    it(`sequence of "and" clauses and nested if() with sequence of "or" clauses (4)`, () => {
      assertStringValue(doc, null, 'if( /data/a ="1" and /data/b ="1", "Eligible", if( /data/a ="0" or /data/d ="0", "Not-Eligible", "nothing"))', 'Not-Eligible'); 
    });

    it(`sequence of "and" clauses and nested if() with sequence of "or" clauses (4)`, () => {
      assertStringValue(doc, null, 'if( /data/a ="1" and /data/b ="1", "Eligible", if( /data/d ="0" or /data/b ="0", "Not-Eligible", "nothing"))', 'Not-Eligible'); 
    });

  });
});
