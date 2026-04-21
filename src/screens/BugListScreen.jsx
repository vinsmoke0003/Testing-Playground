import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import BugCard from '../components/BugCard';
import EmptyState from '../components/EmptyState';
import { subscribeToBugs } from '../services/bugService';

const BugListScreen = ({ navigation }) => {
  const [bugs, setBugs] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedBugs, setSelectedBugs] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToBugs((data) => {
      setBugs(data);
    });
    return () => unsubscribe();
  }, []);

  const handlePress = (id) => {
    if (isSelectionMode) {
      if (selectedBugs.includes(id)) {
        setSelectedBugs(selectedBugs.filter(b => b !== id));
      } else {
        setSelectedBugs([...selectedBugs, id]);
      }
    } else {
      navigation.navigate('BugDetail', { bugId: id });
    }
  };

  const handleBulkAction = () => {
    Alert.alert('Bulk Action', `Marked ${selectedBugs.length} bugs as Resolved.`);
    setSelectedBugs([]);
    setIsSelectionMode(false);
  };

  const renderItem = ({ item }) => (
    <BugCard 
      title={item.title}
      severity={item.severity}
      status={item.status}
      createdAt={item.createdAt}
      selected={selectedBugs.includes(item.id)}
      onPress={() => handlePress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {isSelectionMode ? (
        <View style={styles.selectionHeader}>
          <Text style={styles.selectionText}>{selectedBugs.length} Selected</Text>
          <TouchableOpacity onPress={() => { setIsSelectionMode(false); setSelectedBugs([]); }}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Bugs</Text>
          <TouchableOpacity onPress={() => setIsSelectionMode(true)}>
            <Text style={styles.selectBtnText}>Select Items</Text>
          </TouchableOpacity>
        </View>
      )}

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
      {isSelectionMode && selectedBugs.length > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bulkActionBtn} onPress={handleBulkAction}>
            <Text style={styles.bulkActionText}>Resolve Selected ({selectedBugs.length})</Text>
          </TouchableOpacity>
        </View>
      )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  selectBtnText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectionText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cancelBtnText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bulkActionBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bulkActionText: {
    ...typography.body,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default BugListScreen;
