export const subscribeToTestCases = (callback) => {
  const mockTestCases = [
    {
      id: 'tc-1',
      title: 'Verify User Login with valid credentials',
      steps: ['Launch app', 'Enter valid email', 'Enter valid password', 'Tap Login'],
      expectedResult: 'User is navigated to Dashboard',
      actualResult: '',
      status: 'Pending',
      createdAt: '2025-04-20 09:00 AM',
    },
    {
      id: 'tc-2',
      title: 'Verify Bug Reporting requires mandatory fields',
      steps: ['Navigate to Bug Report', 'Leave fields empty', 'Tap Submit'],
      expectedResult: 'Validation error is shown under required fields',
      actualResult: 'Error is shown correctly',
      status: 'Pass',
      createdAt: '2025-04-19 11:30 AM',
    },
  ];
  
  callback(mockTestCases);
  return () => {};
};

export const updateTestCaseStatus = async (tcId, status, actualResult) => {
  console.log('TODO: updateTestCaseStatus in Firestore. tcId:', tcId, 'status:', status);
  return true;
};
