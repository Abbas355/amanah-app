import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Platform,
    Pressable,
    Image as RNImage,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { AppText } from '@/components/app-text';
import { DashboardHeader } from '@/components/dashboard-header';
import { FormInput } from '@/components/form-input';
import { ImageUploadSheet } from '@/components/image-upload-sheet';
import { ScreenGradient } from '@/components/screen-gradient';
import { FONT_DEFAULT, FONT_SEMIBOLD } from '@/constants/fonts';

const BRAND_BLUE = '#60A5FA';
const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
const SCREEN_WIDTH = Dimensions.get('window').width;

const STATUS_OPTIONS = [
  { id: 'engaged', label: 'Engaged' },
  { id: 'father', label: 'Father' },
  { id: 'single', label: 'Single' },
  { id: 'relationship', label: 'Relationship' },
  { id: 'divorced', label: 'Divorced' },
  { id: 'mother', label: 'Mother' },
  { id: 'married', label: 'Married' },
];

export default function CompleteProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState(new Date('1999-02-25'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [university, setUniversity] = useState('');
  const [field, setField] = useState('');
  
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [coverImageUri, setCoverImageUri] = useState<string | null>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [uploadSheet, setUploadSheet] = useState<{ visible: boolean; type: 'cover' | 'profile' }>({
    visible: false,
    type: 'cover',
  });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('profile');
        if (!raw) return;
        const data = JSON.parse(raw) as {
          firstName?: string; lastName?: string; email?: string; phone?: string; dob?: string;
          university?: string; field?: string; position?: string; company?: string;
          status?: string[]; coverImageUri?: string; profileImageUri?: string; bio?: string;
        };
        if (data.firstName != null) setFirstName(data.firstName);
        if (data.lastName != null) setLastName(data.lastName);
        if (data.email != null) setEmail(data.email);
        if (data.phone != null) setPhone(data.phone);
        if (data.bio != null) setBio(data.bio);
        if (data.dob != null) setDob(new Date(data.dob));
        if (data.university != null) setUniversity(data.university);
        if (data.field != null) setField(data.field);
        if (data.position != null) setPosition(data.position);
        if (data.company != null) setCompany(data.company);
        if (Array.isArray(data.status)) setSelectedStatus(data.status);
        if (data.coverImageUri != null) setCoverImageUri(data.coverImageUri);
        if (data.profileImageUri != null) setProfileImageUri(data.profileImageUri);
      } catch (_) {}
    })();
  }, []);

  const handleImageSelected = (uri: string) => {
    if (uploadSheet.type === 'cover') {
      setCoverImageUri(uri);
    } else {
      setProfileImageUri(uri);
    }
  };

  const handleDateChange = (event: { type: string }, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'dismissed') return;
    }
    if (selected) {
      setDob(selected);
    }
  };

  const formatDate = (date: Date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return `${m.toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}/${y}`;
  };
  const toggleStatus = (id: string) => {
    if (selectedStatus.includes(id)) {
      setSelectedStatus(selectedStatus.filter(s => s !== id));
    } else {
      setSelectedStatus([...selectedStatus, id]);
    }
  };

  const personalInfoComplete = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';
  const educationComplete = university.trim() !== '' && field.trim() !== '';
  const professionalComplete = position.trim() !== '' && company.trim() !== '';
  const statusComplete = selectedStatus.length > 0;
  const completionPercent = [personalInfoComplete, educationComplete, professionalComplete, statusComplete].filter(Boolean).length * 25;
  const GAUGE_SIZE = 180;
  const GAUGE_STROKE = 10;
  const GAUGE_R = (GAUGE_SIZE / 2) - (GAUGE_STROKE / 2);
  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_R;
  const GAUGE_ARC_270 = (270 / 360) * GAUGE_CIRCUMFERENCE;
  const GAUGE_ARC_90 = (90 / 360) * GAUGE_CIRCUMFERENCE;
  const gaugeProgressLength = (completionPercent / 100) * GAUGE_ARC_270;

  const handleSave = async () => {
    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
      dob: dob.toISOString(),
      university: university.trim(),
      field: field.trim(),
      position: position.trim(),
      company: company.trim(),
      status: selectedStatus,
      coverImageUri: coverImageUri ?? undefined,
      profileImageUri: profileImageUri ?? undefined,
    };
    console.log('Profile saved:', profileData);
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(profileData));
      router.back();
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenGradient />
        <Pressable onPress={() => router.back()} style={styles.backRow}>
          <Ionicons name="chevron-back" size={20} color="#111827" />
          <AppText style={styles.backRowLabel}>My Personal Profile</AppText>
        </Pressable>

        {/* Cover & Profile Section */}
        <View style={styles.topSection}>
          <View style={styles.coverWrap}>
            {coverImageUri ? (
              <Image source={{ uri: coverImageUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
            ) : (
              <AppText style={styles.coverText}>رمضان كريم</AppText>
            )}
            <Pressable 
              style={styles.editCoverButton}
              onPress={() => setUploadSheet({ visible: true, type: 'cover' })}
            >
              <RNImage
                source={require('@/assets/images/icons/edit.png')}
                style={styles.editIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: profileImageUri ?? PROFILE_IMAGE }} style={styles.avatar} contentFit="cover" />
            </View>
            <View style={styles.nameInfo}>
              <View style={styles.nameRow}>
                <AppText style={styles.userName}>{[firstName, lastName].filter(Boolean).join(' ') || 'Your Name'}</AppText>
                <Image 
                  source={require('@/assets/images/verified.png')} 
                  style={styles.verifiedBadge} 
                  contentFit="contain" 
                />
              </View>
              <AppText style={styles.userHandle}>@Erzabbb</AppText>
            </View>
          </View>

          <Pressable 
            style={styles.uploadButton}
            onPress={() => setUploadSheet({ visible: true, type: 'profile' })}
          >
            <AppText style={styles.uploadButtonText}>Upload new photo</AppText>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Completion Card */}
        <View style={[styles.completionCard, { marginHorizontal: 24 }]}>
          <AppText style={styles.cardTitle}>Complete your Profile</AppText>
          
          <View style={styles.chartContainer}>
            <View style={[styles.gaugeContainer, { width: GAUGE_SIZE, height: GAUGE_SIZE }]}>
              <Svg width={GAUGE_SIZE} height={GAUGE_SIZE} style={styles.gaugeSvg}>
                <Circle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={GAUGE_R}
                  fill="transparent"
                  stroke="#EBF5FF"
                  strokeWidth={GAUGE_STROKE}
                  strokeDasharray={`${GAUGE_ARC_270} ${GAUGE_ARC_90}`}
                  transform={`rotate(-225 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
                />
                <Circle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={GAUGE_R}
                  fill="transparent"
                  stroke={BRAND_BLUE}
                  strokeWidth={GAUGE_STROKE}
                  strokeDasharray={`${gaugeProgressLength} ${GAUGE_CIRCUMFERENCE}`}
                  transform={`rotate(-225 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
                />
              </Svg>
              <View style={styles.gaugeCenter}>
                <AppText style={styles.chartPercent}>{completionPercent}%</AppText>
              </View>
              <AppText style={styles.gaugeLabelLeft}>00</AppText>
              <AppText style={styles.gaugeLabelRight}>100</AppText>
            </View>
            <AppText style={styles.chartText}>Your profile is{'\n'}completed {completionPercent}%</AppText>
          </View>

          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <AppText style={[styles.stepText, !personalInfoComplete && styles.stepTextInactive]}>Personal Info</AppText>
              {personalInfoComplete ? (
                <Ionicons name="checkmark" size={18} color={BRAND_BLUE} />
              ) : (
                <View style={styles.stepIconEmpty} />
              )}
            </View>
            <View style={styles.stepItem}>
              <AppText style={[styles.stepText, !educationComplete && styles.stepTextInactive]}>Education</AppText>
              {educationComplete ? (
                <Ionicons name="checkmark" size={18} color={BRAND_BLUE} />
              ) : (
                <View style={styles.stepIconEmpty} />
              )}
            </View>
            <View style={styles.stepItem}>
              <AppText style={[styles.stepText, !professionalComplete && styles.stepTextInactive]}>Professional Position</AppText>
              {professionalComplete ? (
                <Ionicons name="checkmark" size={18} color={BRAND_BLUE} />
              ) : (
                <View style={styles.stepIconEmpty} />
              )}
            </View>
            <View style={styles.stepItem}>
              <AppText style={[styles.stepText, !statusComplete && styles.stepTextInactive]}>Your Status</AppText>
              {statusComplete ? (
                <Ionicons name="checkmark" size={18} color={BRAND_BLUE} />
              ) : (
                <View style={styles.stepIconEmpty} />
              )}
            </View>
          </View>
        </View>

        {/* Personal Info Form */}
        <View style={[styles.formSection, { marginHorizontal: 24 }]}>
          <AppText style={styles.sectionTitle}>Personal Info</AppText>
          <FormInput 
            label="First Name" 
            placeholder="First Name" 
            value={firstName} 
            onChangeText={setFirstName}
            style={styles.inputBorder}
          />
          <FormInput 
            label="Last Name" 
            placeholder="Last Name" 
            value={lastName} 
            onChangeText={setLastName}
            style={styles.inputBorder}
          />
          <FormInput 
            label="Email or phone number" 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail}
            style={styles.inputBorder}
          />
          <FormInput 
            label="Phone number" 
            placeholder="+383 44 999 211" 
            value={phone} 
            onChangeText={setPhone}
            style={styles.inputBorder}
            keyboardType="phone-pad"
          />
          <View style={styles.bioFieldWrap}>
            <AppText style={styles.bioFieldLabel}>Bio</AppText>
            <TextInput
              placeholder="In remembrance of Allah, hearts find peace"
              placeholderTextColor="#B2B2B2"
              value={bio}
              onChangeText={setBio}
              style={[styles.bioInput, styles.inputBorder]}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
          <FormInput 
            label="Date of birth (MM/DD/YY)" 
            placeholder="Date of birth" 
            value={formatDate(dob)} 
            rightIcon="calendar"
            onCalendarPress={() => setShowDatePicker(true)}
            style={styles.inputBorder}
            editable={false}
          />
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          {Platform.OS === 'ios' && showDatePicker && (
            <Pressable style={styles.datePickerDone} onPress={() => setShowDatePicker(false)}>
              <AppText style={styles.datePickerDoneText}>Done</AppText>
            </Pressable>
          )}
        </View>

        {/* Education Form */}
        <View style={[styles.formSection, { marginHorizontal: 24 }]}>
          <AppText style={styles.sectionTitle}>Education</AppText>
          <FormInput 
            label="University / School" 
            placeholder="University" 
            value={university} 
            onChangeText={setUniversity}
            style={styles.inputBorder}
          />
          <FormInput 
            label="Field" 
            placeholder="Field of study" 
            value={field} 
            onChangeText={setField}
            style={styles.inputBorder}
          />
        </View>

        {/* Professional Position Form */}
        <View style={[styles.formSection, { marginHorizontal: 24 }]}>
          <AppText style={styles.sectionTitle}>Professional Position</AppText>
          <FormInput 
            label="Position" 
            placeholder="Position" 
            value={position} 
            onChangeText={setPosition}
            style={styles.inputBorder}
          />
          <FormInput 
            label="Company" 
            placeholder="Company" 
            value={company} 
            onChangeText={setCompany}
            style={styles.inputBorder}
          />
        </View>

        {/* Status Section */}
        <View style={[styles.formSection, { marginHorizontal: 24 }]}>
          <AppText style={styles.sectionTitle}>Your Status</AppText>
          <View style={styles.statusGrid}>
            {STATUS_OPTIONS.map((status) => {
              const isSelected = selectedStatus.includes(status.id);
              return (
                <Pressable 
                  key={status.id} 
                  style={[styles.statusChip, isSelected && styles.statusChipSelected]}
                  onPress={() => toggleStatus(status.id)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={10} color="#fff" />}
                  </View>
                  <AppText style={[styles.statusLabel, isSelected && styles.statusLabelSelected]}>
                    {status.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable style={[styles.saveButton, { marginHorizontal: 24 }]} onPress={handleSave}>
          <AppText style={styles.saveButtonText}>Save</AppText>
        </Pressable>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
      
      <ImageUploadSheet
        visible={uploadSheet.visible}
        onClose={() => setUploadSheet(prev => ({ ...prev, visible: false }))}
        onImageSelected={handleImageSelected}
        title={uploadSheet.type === 'cover' ? 'Change your cover' : 'Change your profile photo'}
        uploadText={uploadSheet.type === 'cover' ? 'Click below and upload your Cover' : 'Click below and upload your Profile Photo'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
    marginBottom: 16,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  backRowLabel: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#111827',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  topSection: {
    marginBottom: 24,
    paddingHorizontal: 24, // H_PAD equivalent
  },
  coverWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  coverText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 28,
    color: '#9CA3AF',
    opacity: 0.8,
  },
  editCoverButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: '#111827',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#F3F4F6',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameInfo: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 56,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 18,
    color: '#111827',
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  userHandle: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: -2,
  },
  uploadButton: {
    height: 48,
    backgroundColor: BRAND_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    gap: 8,
  },
  uploadButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#fff',
  },
  completionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#111827',
    marginBottom: 24,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  gaugeContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  gaugeSvg: {
    position: 'absolute',
  },
  gaugeCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeLabelLeft: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: FONT_DEFAULT,
  },
  gaugeLabelRight: {
    position: 'absolute',
    bottom: 0,
    right: 40,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: FONT_DEFAULT,
  },
  chartPercent: {
    fontFamily: FONT_DEFAULT,
    fontSize: 32,
    color: '#111827',
  },
  chartText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 20,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  stepText: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: '#111827',
  },
  stepTextInactive: {
    color: '#9CA3AF',
    fontWeight: '400',
    fontFamily: FONT_DEFAULT,
  },
  stepIconEmpty: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  formSection: {
    marginBottom: 32,
    gap: 16,
  },
  sectionTitle: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 8,
    minWidth: '45%',
    flex: 1,
  },
  statusChipSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: BRAND_BLUE,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  statusLabel: {
    fontFamily: FONT_DEFAULT,
    fontSize: 14,
    color: '#111827',
  },
  statusLabelSelected: {
    fontFamily: FONT_SEMIBOLD,
    color: '#111827',
  },
  datePickerDone: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  datePickerDoneText: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_BLUE,
  },
  saveButton: {
    backgroundColor: BRAND_BLUE,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    marginTop: 8,
  },
  saveButtonText: {
    fontFamily: FONT_DEFAULT,
    fontSize: 15,
    color: '#fff',
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: BRAND_BLUE,
    backgroundColor: '#fff',
  },
  bioFieldWrap: {
    gap: 6,
  },
  bioFieldLabel: {
    fontFamily: FONT_DEFAULT,
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    paddingLeft: 12,
  },
  bioInput: {
    fontFamily: FONT_DEFAULT,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 88,
    includeFontPadding: false,
  },
});
