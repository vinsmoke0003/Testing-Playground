import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { createBug } from '../services/bugService';

const BugReportScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      title,
      description,
      severity,
      steps,
      imageUri: image,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };
    
    // TODO: bugService.createBug(formData)
    await createBug(formData);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.input}
          placeholder="Keep it brief and descriptive"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="What exactly went wrong?"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Severity</Text>
        <View style={styles.severityRow}>
          {['Low', 'Medium', 'High', 'Critical'].map((level) => (
            <TouchableOpacity 
              key={level} 
              style={[styles.severityButton, severity === level && styles.activeSeverityButton]}
              onPress={() => setSeverity(level)}
            >
              <Text style={[styles.severityButtonText, severity === level && styles.activeSeverityButtonText]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Steps to Reproduce</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={steps}
          onChangeText={setSteps}
        />

        <Text style={styles.label}>Attachment</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage} activeOpacity={0.7}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.imagePickerText}>+ Add Screenshot</Text>
          )}
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Bug Report</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    color: colors.textPrimary,
    ...typography.body,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  severityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  severityButton: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeSeverityButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  severityButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  activeSeverityButtonText: {
    color: '#ffffff',
  },
  imagePicker: {
    height: 150,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePickerText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    ...typography.button,
    color: '#ffffff',
  },
});

export default BugReportScreen;
