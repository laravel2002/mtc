import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { ChapterAPI } from '@/features/chapter/api';

const { width, height } = Dimensions.get('window');

export default function ReaderScreen() {
  const { chapterId } = useLocalSearchParams();
  const router = useRouter();
  
  const [showUI, setShowUI] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  // Fetch nội dung chương từ API thực tế
  const { data: responseData, isLoading, isError, error } = useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => ChapterAPI.getChapterDetail(chapterId as string),
  });

  // Bóc tách dữ liệu từ wrapper { data, pagination } của apiClient
  const chapter = responseData?.data;

  const toggleUI = () => setShowUI(!showUI);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4DA6FF" />
        <Text style={styles.loadingText}>Đang tải nội dung chương...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Lỗi tải chương: {String(error)}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Vùng chạm để bật/tắt UI */}
      <TouchableWithoutFeedback onPress={toggleUI}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Tùy thuộc vào schema Prisma của bạn, hãy map đúng tên field (ví dụ: title, content) */}
          <Text style={styles.chapterTitle}>{chapter?.title || chapter?.chapterTitle || `Chương ${chapter?.chapterNumber || ''}`}</Text>
          <Text style={[styles.content, { fontSize, lineHeight: fontSize * 1.6 }]}>
            {chapter?.content || 'Nội dung đang được cập nhật...'}
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* OVERLAY UI: Header */}
      {showUI && (
        <SafeAreaView style={styles.headerOverlay}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerStoryTitle} numberOfLines={1}>
              {chapter?.story?.title || chapter?.storyTitle || 'Đang đọc'}
            </Text>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}

      {/* OVERLAY UI: Footer (Chuyển chương) */}
      {showUI && (
        <SafeAreaView style={styles.footerOverlay}>
          <View style={styles.footerRow}>
            <TouchableOpacity 
              style={styles.navBtn}
              disabled={!chapter?.prevChapterId}
              onPress={() => router.replace(`/${chapter?.prevChapterId}`)}
            >
              <Ionicons name="chevron-back" size={20} color={chapter?.prevChapterId ? "#fff" : "#555"} />
              <Text style={[styles.navText, !chapter?.prevChapterId && styles.disabledText]}>Chương trước</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navBtn}
              disabled={!chapter?.nextChapterId}
              onPress={() => router.replace(`/${chapter?.nextChapterId}`)}
            >
              <Text style={[styles.navText, !chapter?.nextChapterId && styles.disabledText]}>Chương sau</Text>
              <Ionicons name="chevron-forward" size={20} color={chapter?.nextChapterId ? "#fff" : "#555"} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  center: { justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 40, paddingBottom: 100 },
  chapterTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  content: { color: '#D1D1D1', textAlign: 'justify' },
  loadingText: { color: '#8E8E93', marginTop: 12 },
  errorText: { color: '#ff4444', marginBottom: 20 },
  backBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#1C1C1E', borderRadius: 8 },
  backBtnText: { color: '#fff' },
  
  // Overlay Styles
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'rgba(28, 28, 30, 0.95)' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerStoryTitle: { color: '#fff', fontSize: 16, fontWeight: '600', flex: 1, textAlign: 'center', marginHorizontal: 16 },
  iconBtn: { padding: 4 },
  
  footerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(28, 28, 30, 0.95)' },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  navText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  disabledText: { color: '#555' },
});
