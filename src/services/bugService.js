// TODO: Integrate Firebase CRUD operations here
// import { db } from './firebase';

export const subscribeToBugs = (callback) => {
  // Mock data for UI development
  const mockBugs = [
    {
      id: 'bug-1',
      title: 'App crashes on Login screen when tapping back quickly',
      description: 'Navigating between login and register quickly causes a fatal exception.',
      severity: 'Critical',
      status: 'Open',
      createdAt: '2025-04-20 10:00 AM',
    },
    {
      id: 'bug-2',
      title: 'Profile avatar does not refresh after upload',
      description: 'The image uploads to storage successfully but the UI component does not update its source.',
      severity: 'Medium',
      status: 'In Progress',
      createdAt: '2025-04-19 02:30 PM',
    },
    {
      id: 'bug-3',
      title: 'Text overflow in Dashboard screen on small devices',
      description: 'Card titles wrap awkwardly and push other elements off-screen on iPhone SE.',
      severity: 'Low',
      status: 'Resolved',
      createdAt: '2025-04-18 09:15 AM',
    }
  ];
  
  callback(mockBugs);
  return () => {}; // Unsubscribe function
};

export const createBug = async (bugData) => {
  console.log('TODO: createBug in Firestore', bugData);
  return { id: 'new-bug-id', ...bugData };
};

export const updateBugStatus = async (bugId, status) => {
  console.log('TODO: updateBugStatus in Firestore. bugId:', bugId, 'status:', status);
  return true;
};
