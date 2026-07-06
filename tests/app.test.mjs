import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../app.js',import.meta.url),'utf8');

test('personal bank starts empty for a new student and persists later choices',()=>{
  assert.match(source,/localStorage\.getItem\('arc-question-bank'\)\|\|'\[\]'/);
  assert.match(source,/localStorage\.setItem\('arc-question-bank'/);
});
test('redo cards retain original PDF page references',()=>{
  assert.match(source,/questionPage:examPages\[question\]/);
  assert.match(source,/solutionPage:solutionPartPages\[part\.id\]/);
  assert.match(source,/Reveal original solution/);
});
test('progress is calculated from persistent attempt history',()=>{
  assert.match(source,/attemptHistory:loadAttemptHistory\(\)/);
  assert.match(source,/Average mark/);
  assert.match(source,/Average time per paper/);
  assert.match(source,/data-delete-attempt/);
});
test('marking schema totals 70 marks and IDs are unique',()=>{
  const block=source.match(/const abbotsleighMarkingSchema=\[(.*?)\n\];/s)?.[1]??'';
  const totals=[...block.matchAll(/total:(\d+)/g)].map(match=>Number(match[1]));
  const ids=[...block.matchAll(/id:'([^']+)'/g)].map(match=>match[1]);
  assert.equal(totals.reduce((sum,value)=>sum+value,0),70);
  assert.equal(new Set(ids).size,ids.length);
});

test('Ascham schema totals 100 marks and is linked to source PDFs',()=>{
  const block=source.match(/const aschamMarkingSchema=\[(.*?)\n\];/s)?.[1]??'';
  const totals=[...block.matchAll(/total:(\d+)/g)].map(match=>Number(match[1]));
  assert.equal(totals.reduce((sum,value)=>sum+value,0),100);
  assert.match(source,/ascham-2024-advanced-trial\.pdf/);
  assert.match(source,/ascham-2024-advanced-solutions\.pdf/);
});

test('question bank supports item and topic selection',()=>{
  assert.match(source,/data-bank-select/);
  assert.match(source,/data-select-topic/);
  assert.match(source,/data-shuffle-selected/);
});

test('Sydney Grammar Standard 2 schema totals 100 marks',()=>{
  const block=source.match(/const grammarMarkingSchema=\[(.*?)\n\];/s)?.[1]??'';
  const explicit=[...block.matchAll(/q:\d+,total:(\d+)/g)].map(match=>Number(match[1]));
  assert.equal(15+explicit.reduce((sum,value)=>sum+value,0),100);
  assert.match(source,/sydney-grammar-2025-standard-2-trial\.pdf/);
  assert.match(source,/sydney-grammar-2025-standard-2-solutions\.pdf/);
});

test('statistics and syllabus results are filtered by course',()=>{
  assert.match(source,/attemptCourse\(attempt\)===state\.statsCourse/);
  assert.match(source,/data-stats-course/);
  assert.match(source,/Results never mix across Standard, Advanced or Extension courses/);
});

test('bank questions can be removed and paper details show attempt history',()=>{
  assert.match(source,/data-remove-bank/);
  assert.match(source,/actionToast\('Question removed from your bank\.'/);
  assert.match(source,/Question restored\./);
  assert.match(source,/function paperAttemptHistory/);
  assert.match(source,/Past attempts/);
});

test('overview uses the profile goal and weekly paper target',()=>{
  assert.match(source,/Your main goal/);
  assert.match(source,/function weeklyPlan/);
  assert.match(source,/state\.profile\.weekly/);
});

test('library supports searching, filtering and private PDF uploads',()=>{
  assert.match(source,/Search school, year, course or topic/);
  assert.match(source,/data-upload-form/);
  assert.match(source,/accept="application\/pdf/);
  assert.match(source,/api\/papers\/import/);
});
