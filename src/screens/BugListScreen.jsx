import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import BugCard from '../components/BugCard';
import EmptyState from '../components/EmptyState';
import { subscribeToBugs } from '../services/bugService';
import { useAuth } from '../contexts/AuthContext';

const BugListScreen = ({ navigation }) => {
  const { role } = useAuth();
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
          <View style={styles.headerActions}>
            {role === 'tester' && (
              <TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('BugReport')}>
                <Text style={styles.reportBtnText}>+ Report</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setIsSelectionMode(true)}>
              <Text style={styles.selectBtnText}>Select Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={bugs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState 
            message={role === 'tester' ? "No bugs reported yet." : "No bugs assigned to you."} 
            actionLabel={role === 'tester' ? "Report a Bug" : undefined} 
            onAction={role === 'tester' ? () => navigation.navigate('BugReport') : undefined} 
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  reportBtn: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reportBtnText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
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
