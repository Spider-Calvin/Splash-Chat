const baseUrl = import.meta.env.VITE_APP_APIURL

async function postService( url = '', body = {}) {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+sessionStorage.getItem("token")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function postFormData( url = '', body) {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: body
  });
  return await response.json(); 
}

async function getService( url = '') {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+sessionStorage.getItem("token")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
  });
  return await response.json(); 
}

async function getTokenService( url = '', token='') {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization":'Bearer '+token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
  });
  return await response.json(); 
}

async function putService( url = '', body = {}) {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+sessionStorage.getItem("token")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function patchService( url = '', body = {}) {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+sessionStorage.getItem("token")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function patchTokenService( url = '', body = {}, token='') {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function putTokenService( url = '', body = {}, token='') {
  
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function deleteService( url = '', body = {}) {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+sessionStorage.getItem("token")
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

async function deleteTokenService( url = '', body = {}, token='') {
  const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":'Bearer '+token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(body), 
  });
  return await response.json(); 
}

const stringInterpolator = (stringToReplace, data) => {
  return stringToReplace.replace(
    /{\w+}/g,
    (placeholder) =>
      data[placeholder.substring(1, placeholder.length - 1)] || placeholder,
  );
};

const API_ROUTES = {
  GET_HOME_DATA : `/hrdashboard/home/{corporateid}`,
  CLINICAL_DATA : `/hrdashboard/healthinsights/{corporateid}`,
  POLICY_DETAILS : `/hrdashboard/insurance/{id}?corporateid={corporateid}`,
  POLICY_DATA: `/policy/{id}?type=customer`,
  POLICY_BENEFITS: `/policy/{id}?type=policydetails`,
  GENERATE_TPA_CARD : `/patient/createtpacard/{patientid}`,
  CALCULATE_COST : `/corporate/hrdashboard/calculatecost`,
  CREATE_EMPLOYEE : `/patient/createemployee`,
  UPDATE_EMPLOYEE: `/patient/hrdashboard/{patientid}`,
  DELETE_EMPLOYEE : `/patient/employee/{employeeid}`,
  SANITY_CHECK : `/corporate/sanitycheckv2`,
  BULK_UPLOAD : `/corporate/hrdashboard/bulkupload`,
  MANAGED_CARE : `/hrdashboard/managedcare/{corporateid}`,
  CSICK_DATA : `/hrdashboard/csickcare/{corporateid}`,
  MENTAL_DATA : `/hrdashboard/teampulse/{corporateid}`,
  DEALS_DATA : `/hrdashboard/offers/{corporateid}`,
  SEND_OTP : `/corporate/login/sendotpv2`,
  VERIFY_OTP : `/corporate/login/verifyotpv2`,
  // CORPORATE_DETAILS : `/corporate/{id}`,
  VERIFY_OAUTH : `/corporate/login/verifyoauth`,
  UPDAATE_HISTORY : `/corporate/hrdashboard/{corporateid}?from={from}&to={to}`,
  CORPORATE_USERS : `/corporate/hrdashboard/searchusers`,
  GET_CONSULTATIONS : `/hrdashboard/patients/consults`,
  CLAIM_DATA : `/hrdashboard/ipclaims/{corporateid}`,
  CLAIM_DATAV2 : `/hrdashboard/ipclaims/{corporateid}/{policyid}`,
  CD_ACCOUNTS : `/policy/accstatementspolicies/{id}`,
  UPDATE_CD_BALANCES : `/policy/accstatementspolicies/create`,
  GET_WEBINAR_DATA : `/hrdashboard/webinars/{corporateid}`,
  SEND_TPA_CARD: `/policy/sendtpa`,
  GET_EMPLOYEE_DETAILS: `/corporate/employee/{corporateid}/{employeeid}`,
  CREATE_LIFE: `/patient/createlife`,
  UPDATE_STAFF_USER: `/corporate/hrdashboard/settings`,
  DELETE_STAFF_USER: `/corporate/users/{id}`,
  GET_STORIES:`/hrdashboard/stories/{corporateid}`,
  GET_CHALLENGES:`/games/challenge/all/{corporateid}`,
  CREATE_CHALLENGES:`/games/challenge/createchallenge`,
  GET_CHALLENGES_LEADER:'/games/challenge/leaderboard/{challengeid}',
  GET_USER_CHALLENGE_DATA:'/games/challenge/performance/{patientid}/{challengeid}',
  SYNC_USERDATA:`/wearable/spikeapi/syncdata/{patientid}`,
  DELETE_CHALLENGE:`/games/challenge/{challengeid}`,
  SANITY_CHECK_DELETE:`/corporate/bulkdeletion/sanitycheck`,
  BULK_DELETE:`/corporate/hrdashboard/bulkdeletion`,
  HEALTH_STREAM_DATA:`/hrdashboard/healthstream/{corporateid}?days={days}&type={type}&baselocation={location}&department={department}`,
  DELAYED_CALIMS:`/hrdashboard/ipclaims/duration/{claimid}/{corporateid}?duration={duration}`,
  LOGOUT:`/hrdashboard/logout`,
  EMP_ENGAGEMENT:`/hrdashboard/comstatus/{corporateid}`
}

const environment = import.meta.env.VITE_APP_ENVIRON;
const corporateId = sessionStorage.getItem("corporateid");

export {
  getService,
  postService,
  putService,
  deleteService,
  patchService,
  API_ROUTES,
  stringInterpolator,
  putTokenService,
  patchTokenService,
  getTokenService,
  deleteTokenService,
  postFormData,
  baseUrl,
  environment,
  corporateId
}
  