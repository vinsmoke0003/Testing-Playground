import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import BugCard from '../components/BugCard'; // Reusing visual structure for Test Cases
import EmptyState from '../components/EmptyState';
import { subscribeToTestCases } from '../services/testCaseService';

const TestCaseListScreen = ({ navigation }) => {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToTestCases((data) => {
      setTestCases(data);
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <BugCard 
      title={item.title}
      severity="Test"  // Mocking severity spot with label
      status={item.status}
      createdAt={item.createdAt}
      onPress={() => navigation.navigate('TestCaseDetail', { tcId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={testCases}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState 
            message="No test cases structured yet." 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
});

export default TestCaseListScreen;
