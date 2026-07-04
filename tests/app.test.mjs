import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../app.js',import.meta.url),'utf8');

test('personal bank starts empty',()=>assert.match(source,/const wrongQuestions=\[\];/));
test('redo cards retain original PDF page references',()=>{
  assert.match(source,/questionPage:examPages\[question\]/);
  assert.match(source,/solutionPage:solutionPartPages\[part\.id\]/);
  assert.match(source,/Reveal original solution/);
});
test('progress is calculated from attempt history',()=>{
  assert.match(source,/attemptHistory:\[\]/);
  assert.match(source,/Average mark/);
  assert.match(source,/Average time per paper/);
});
test('marking schema totals 70 marks and IDs are unique',()=>{
  const block=source.match(/const abbotsleighMarkingSchema=\[(.*?)\n\];/s)?.[1]??'';
  const totals=[...block.matchAll(/total:(\d+)/g)].map(match=>Number(match[1]));
  const ids=[...block.matchAll(/id:'([^']+)'/g)].map(match=>match[1]);
  assert.equal(totals.reduce((sum,value)=>sum+value,0),70);
  assert.equal(new Set(ids).size,ids.length);
});
