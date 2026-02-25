import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { FormInput } from '@/components/form-input';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';

const AVATARS = [
  'https://ui-avatars.com/api/?name=User+1&background=random',
  'https://ui-avatars.com/api/?name=User+2&background=random',
  'https://ui-avatars.com/api/?name=User+3&background=random',
  'https://ui-avatars.com/api/?name=User+4&background=random',
  'https://ui-avatars.com/api/?name=User+5&background=random',
  'https://ui-avatars.com/api/?name=User+6&background=random',
  'https://ui-avatars.com/api/?name=User+7&background=random',
  'https://ui-avatars.com/api/?name=User+8&background=random',
  'https://ui-avatars.com/api/?name=User+9&background=random',
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

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const renderFormStep = () => (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
        />
        <FormInput
          label="Handle"
          placeholder="Handle"
          value={handle}
          onChangeText={setHandle}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.cancelButton} onPress={handleClose}>
          <AppText style={styles.cancelButtonText}>Cancel</AppText>
        </Pressable>
        <Pressable style={styles.createButton}>
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
                <Image source={{ uri: avatar }} style={styles.avatarGridImage} />
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.uploadArea}>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={48} color={BRAND_BLUE} />
              <AppText style={styles.uploadBoxText}>Click below and upload your Cover</AppText>
              <AppText style={styles.uploadBoxSubtext}>png, and jpg accepted</AppText>
              <Pressable style={styles.uploadActionButton}>
                <AppText style={styles.uploadActionButtonText}>Upload</AppText>
              </Pressable>
            </View>
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
        
        <View style={[styles.sheet, { paddingTop: insets.top }]}>
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <Pressable onPress={handleClose} style={styles.backButton}>
               <Ionicons name="chevron-back" size={20} color="#111827" />
               <AppText style={styles.headerTitle}>My Profile</AppText>
            </Pressable>
          </View>

          {step === 'form' ? renderFormStep() : renderPictureStep()}
        </View>
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
    height: '92%', // Covers most of the screen
    overflow: 'hidden',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
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
  },
  uploadButton: {
    backgroundColor: BRAND_BLUE,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#fff',
  },
  form: {
    gap: 16,
    marginBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: BRAND_BLUE,
  },
  createButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: BRAND_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 15,
    color: '#fff',
  },
  // Picture Step Styles
  pictureContainer: {
    flex: 1,
  },
  pictureHeading: {
    fontFamily: FONT_DEFAULT,
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  pictureTabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    marginHorizontal: 24,
    padding: 4,
    marginBottom: 24,
  },
  pictureTab: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  pictureTabActive: {
    backgroundColor: BRAND_BLUE,
  },
  pictureTabText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 13,
    color: '#6B7280',
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
    borderColor: '#E5E7EB',
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
  },
});
