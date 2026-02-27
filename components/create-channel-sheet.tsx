import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { FormInput } from '@/components/form-input';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';

const AVATARS = [
  require('@/assets/images/av/av1.png'),
  require('@/assets/images/av/av2.png'),
  require('@/assets/images/av/av3.png'),
  require('@/assets/images/av/av4.png'),
  require('@/assets/images/av/av5.png'),
  require('@/assets/images/av/av6.png'),
  require('@/assets/images/av/av7.png'),
  require('@/assets/images/av/av8.png'),
  require('@/assets/images/av/av9.png'),
];

type CreateChannelSheetProps = {
  visible: boolean;
  onClose: () => void;
};

export function CreateChannelSheet({ visible, onClose }: CreateChannelSheetProps) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'form' | 'picture'>('form');
  const [firstName, setFirstName] = useState('Erza Bilalli');
  const [handle, setHandle] = useState('Erzablb189');
  const [pictureTab, setPictureTab] = useState<'AVATAR' | 'IMAGE'>('AVATAR');
  const [coverImageUri, setCoverImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) setCoverImageUri(result.assets[0].uri);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const renderFormStep = () => (
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
      <AppText style={styles.heading}>Create Channel</AppText>
      <AppText style={styles.description}>
        This is used to publicly represent your channel on Amanah. You can change this later. This creates a new channel on Amanah with its own settings, including Amanah search and watch history.
      </AppText>

      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder}>
          <AppText style={styles.avatarInitials}>EB</AppText>
        </View>
      </View>

      <Pressable style={styles.uploadButton} onPress={() => setStep('picture')}>
        <AppText style={styles.uploadButtonText}>Upload Picture</AppText>
      </Pressable>

      <View style={styles.form}>
        <FormInput
          label="First Name"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputStyle}
        />
        <FormInput
          label="Handle"
          placeholder="Handle"
          value={handle}
          onChangeText={setHandle}
          style={styles.inputStyle}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.cancelButton} onPress={handleClose}>
          <AppText style={styles.cancelButtonText}>Cancel</AppText>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleClose}>
          <AppText style={styles.createButtonText}>Create Channel</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderPictureStep = () => (
    <View style={styles.pictureContainer}>
      <AppText style={styles.pictureHeading}>Choose your picture</AppText>
      
      <View style={styles.pictureTabs}>
        <Pressable 
          style={[styles.pictureTab, pictureTab === 'AVATAR' && styles.pictureTabActive]}
          onPress={() => setPictureTab('AVATAR')}
        >
          <AppText style={[styles.pictureTabText, pictureTab === 'AVATAR' && styles.pictureTabTextActive]}>AVATAR</AppText>
        </Pressable>
        <Pressable 
          style={[styles.pictureTab, pictureTab === 'IMAGE' && styles.pictureTabActive]}
          onPress={() => setPictureTab('IMAGE')}
        >
          <AppText style={[styles.pictureTabText, pictureTab === 'IMAGE' && styles.pictureTabTextActive]}>IMAGE</AppText>
        </Pressable>
      </View>

      <View style={styles.pictureContent}>
        {pictureTab === 'AVATAR' ? (
          <View style={styles.avatarGrid}>
            {AVATARS.map((avatar, index) => (
              <Pressable key={index} style={styles.avatarGridItem}>
                <Image source={avatar} style={styles.avatarGridImage} contentFit="cover" />
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.uploadArea}>
            <Pressable style={styles.uploadBox} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={48} color={BRAND_BLUE} />
              <AppText style={styles.uploadBoxText}>Click below and upload your Cover</AppText>
              <AppText style={styles.uploadBoxSubtext}>png, and jpg accepted</AppText>
              <View style={styles.uploadActionButton}>
                <AppText style={styles.uploadActionButtonText}>Upload</AppText>
              </View>
            </Pressable>
            {coverImageUri && (
              <Image source={{ uri: coverImageUri }} style={styles.coverPreview} contentFit="cover" />
            )}
          </View>
        )}
      </View>

      <View style={[styles.footer, { paddingHorizontal: 24, paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.cancelButton} onPress={() => setStep('form')}>
          <AppText style={styles.cancelButtonText}>Cancel</AppText>
        </Pressable>
        <Pressable style={styles.createButton} onPress={() => setStep('form')}>
          <AppText style={styles.createButtonText}>Create Channel</AppText>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1, justifyContent: 'flex-end' }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Negative offset to pull sheet up
        >
          <View style={[styles.sheet, { paddingTop: insets.top }]}>
            <View style={styles.handle} />
            
             {step === 'form' ? renderFormStep() : renderPictureStep()}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%', // Covers 80% of the screen
    overflow: 'hidden',
    width: '100%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  heading: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 32,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 32,
    color: BRAND_BLUE,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 4, // Visual centering adjustment for Poppins
  },
  uploadButton: {
    backgroundColor: BRAND_BLUE,
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#fff',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  form: {
    gap: 16,
    marginBottom: 40,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: BRAND_BLUE,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  createButton: {
    flex: 1,
    height: 40,
    borderRadius: 50,
    backgroundColor: BRAND_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#fff',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  // Picture Step Styles
  pictureContainer: {
    flex: 1,
  },
  pictureHeading: {
    fontFamily: FONT_DEFAULT,
    fontSize: 18,
    color: '#111827',
    textAlign: 'left',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  pictureTabs: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  pictureTab: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
  },
  pictureTabActive: {
    backgroundColor: BRAND_BLUE,
  },
  pictureTabText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 13,
    color: '#6B7280',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  pictureTabTextActive: {
    color: '#fff',
  },
  pictureContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  avatarGridItem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  avatarGridImage: {
    width: '100%',
    height: '100%',
  },
  uploadArea: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  uploadBoxText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
    marginTop: 8,
  },
  uploadBoxSubtext: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#9CA3AF',
  },
  uploadActionButton: {
    backgroundColor: BRAND_BLUE,
    paddingHorizontal: 32,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '80%',
  },
  uploadActionButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#fff',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  coverPreview: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: '#F3F4F6',
  },
});
