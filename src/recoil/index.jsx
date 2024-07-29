import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const homeData = atom({
  key: 'homeData', 
  default: {},
});

const clinicalData = atom({
  key: 'clinicalData', 
  default: {},
});

const insuranceDetails = atom({
  key: 'insuranceDetails', 
  default: {},
});

const policies = atom({
  key: 'policies', 
  default: {},
});

const careData = atom({
  key: 'careData', 
  default: {},
});

const cSick = atom({
  key: 'cSick', 
  default: {},
});

const mentalData = atom({
  key: 'mentalData', 
  default: {},
})

const dealsData = atom({
  key: 'dealsData',
  default: {}
})

const corporate = atom({
  key: 'corporate',
  default: {}
})

const loggedIn = atom({
  key: 'loggedIn',
  default: false
})

const claimData = atom({
  key: 'claimData',
  default: false
})

export {
  homeData,
  clinicalData,
  insuranceDetails,
  policies,
  careData,
  cSick,
  mentalData,
  dealsData,
  corporate,
  loggedIn,
  claimData
}