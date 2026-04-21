import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import BugCard from '../components/BugCard';
import EmptyState from '../components/EmptyState';
import { subscribeToBugs } from '../services/bugService';

const BugListScreen = ({ navigation }) => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToBugs((data) => {
      setBugs(data);
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <BugCard 
      title={item.title}
      severity={item.severity}
      status={item.status}
      createdAt={item.createdAt}
      onPress={() => navigation.navigate('BugDetail', { bugId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bugs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState 
            message="No bugs reported yet." 
            actionLabel="Report a Bug" 
            onAction={() => navigation.navigate('BugReport')} 
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

export default BugListScreen;
