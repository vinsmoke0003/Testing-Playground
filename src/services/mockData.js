export const mockActivityFeed = [
  { id: '1', user: 'Alice', action: 'commented', text: '@Bob, I think it is an API issue.', time: '10m ago' },
  { id: '2', user: 'System', action: 'status_changed', text: 'Status changed to In Progress', time: '1h ago' },
  { id: '3', user: 'Bob', action: 'assigned', text: 'Assigned to Bob', time: '2h ago' }
];

export const mockTesterPerformance = {
  labels: ['Alice', 'Bob', 'Charlie', 'Dana'],
  data: [15, 9, 22, 5]
};

export const mockBugTrends = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  data: [3, 8, 4, 12, 6]
};

export const mockDeviceMetadata = {
  os: 'iOS 17.1',
  device: 'iPhone 15 Pro',
  ram: 'Free: 2.1GB / Total: 8GB',
  network: 'WiFi (Excellent)'
};
