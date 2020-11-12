const BaseModel = {
  ID: 0,
  date: null,
  title: null,
  description: null
};

const partProperties = {
  hasPart: null,
  isPartOf: null
};

const TestCriterionModel = Object.assign(
  Object.create(BaseModel),
  partProperties
);

const TestRequirementModel = Object.assign(
  Object.create(TestCriterionModel),
  {}
);

const TestCaseModel = Object.assign(Object.create(TestCriterionModel), {});

const TestSubjectModel = Object.assign(Object.create(BaseModel), partProperties);

export const TestResultModel = Object.assign(Object.create(BaseModel), partProperties, {
  outcome: ''
});

const AssertorModel = Object.assign(Object.create(BaseModel), {});

export const AssertionModel = Object.assign(Object.create(BaseModel), {
  assertedBy: {},
  mode: 'manual',
  result: {},
  subject: {},
  test: {}
});

export default {
  AssertionModel,
  AssertorModel,
  TestCaseModel,
  TestRequirementModel,
  TestResultModel,
  TestSubjectModel
};
