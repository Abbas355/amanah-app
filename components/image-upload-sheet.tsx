import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { FONT_DEFAULT } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';
const SCREEN_HEIGHT = Dimensions.get('window').height;

type ImageUploadSheetProps = {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
  title?: string;
  uploadText?: string;
};

export function ImageUploadSheet({ 
  visible, 
  onClose, 
  onImageSelected, 
  title = 'Change your cover',
  uploadText = 'Click below and upload your Cover'
}: ImageUploadSheetProps) {
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleApply = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
      handleClose();
    }
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleClose = () => {
    setSelectedImage(null);
    onClose();
  };

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
        
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          
          <AppText style={styles.title}>{title}</AppText>

          {!selectedImage ? (
            // Empty State
            <View style={styles.content}>
              <Pressable style={styles.uploadArea} onPress={pickImage}>
                <View style={styles.uploadIconCircle}>
                  <Ionicons name="cloud-upload-outline" size={32} color={BRAND_BLUE} />
                </View>
                <AppText style={styles.uploadTitle}>{uploadText}</AppText>
                <AppText style={styles.uploadSubtitle}>png, and jpg accepted</AppText>
                
                <View style={styles.uploadButton}>
                  <AppText style={styles.uploadButtonText}>Upload</AppText>
                </View>
              </Pressable>
            </View>
          ) : (
            // Preview State
            <View style={styles.content}>
              <View style={styles.previewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
                <View style={styles.cropOverlay}>
                   {/* Dashed border overlay simulation */}
                   <View style={styles.dashedBorder} />
                </View>
              </View>

              <View style={styles.actionsRow}>
                <Pressable onPress={handleDelete}>
                  <AppText style={styles.actionTextBlue}>Delete Photo</AppText>
                </Pressable>
                
                <Pressable style={styles.changeButton} onPress={pickImage}>
                  <AppText style={styles.actionTextBlue}>Change Photo</AppText>
                </Pressable>
                
                <Pressable style={styles.applyButton} onPress={handleApply}>
                  <AppText style={styles.applyButtonText}>Apply</AppText>
                </Pressable>
              </View>
            </View>
          )}
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
    paddingTop: 12,
    paddingHorizontal: 24,
    minHeight: SCREEN_HEIGHT * 0.75,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: FONT_DEFAULT,
    fontSize: 18,
    color: '#111827',
    marginBottom: 24,
  },
  content: {
    flex: 1,
  },
  uploadArea: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24, // Space below
  },
  uploadIconCircle: {
    marginBottom: 8,
  },
  uploadTitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: BRAND_BLUE,
    height: 40,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#fff',
  },
  // Preview Styles
  previewContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderStyle: 'dashed',
    marginBottom: 24, // Space below
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cropOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dashedBorder: {
    width: '100%',
    height: '80%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionTextBlue: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: BRAND_BLUE,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  changeButton: {
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: BRAND_BLUE,
    height: 32,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
