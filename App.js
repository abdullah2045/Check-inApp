import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
  ScrollView,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Utama: Mengambil Izin dan Menjalankan Fitur Native
  const handleCheckIn = async () => {
    setIsLoading(true);

    try {
      // 1. Request Izin Kamera
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        setIsLoading(false);
        Alert.alert(
          "Akses Kamera Ditolak",
          "Aplikasi butuh akses kamera untuk mengambil foto selfie check-in kamu.",
          [
            { text: "Batal", style: "cancel" },
            { text: "Buka Pengaturan", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      // 2. Request Izin Lokasi/GPS
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      if (locationPermission.status !== "granted") {
        setIsLoading(false);
        Alert.alert(
          "Akses Lokasi Ditolak",
          "Aplikasi butuh akses GPS untuk mencatat koordinat check-in kamu.",
          [
            { text: "Batal", style: "cancel" },
            { text: "Buka Pengaturan", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      // 3. Ambil Foto via Kamera Fisik HP
      let cameraResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (cameraResult.canceled) {
        setIsLoading(false);
        return;
      }

      // 4. Ambil Koordinat GPS HP
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // 5. Simpan Hasil Ke State untuk Tampilan UI
      setImageUri(cameraResult.assets[0].uri);
      setLocationData(currentLocation.coords);
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat mengakses fitur native.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Level 2: Fitur Buka di Google Maps via Linking
  const openInGoogleMaps = () => {
    if (!locationData) return;
    const { latitude, longitude } = locationData;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Tidak dapat membuka Google Maps.");
    });
  };

  // Reset State Data
  const handleReset = () => {
    setImageUri(null);
    setLocationData(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#064e3b" />

      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Misi 13: Native Power App</Text>
        <Text style={styles.headerTitle}>📸 SnapCheck App</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Utama / Preview Area */}
        <View style={styles.card}>
          {imageUri ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />

              <View style={styles.locationBadge}>
                <Text style={styles.locationTitle}>📍 Koordinat Terkunci:</Text>
                <Text style={styles.locationText}>
                  Lat: {locationData?.latitude.toFixed(5)}
                </Text>
                <Text style={styles.locationText}>
                  Lng: {locationData?.longitude.toFixed(5)}
                </Text>
              </View>

              {/* Tombol Aksi Level 2: Buka Maps */}
              <TouchableOpacity
                style={styles.mapsButton}
                onPress={openInGoogleMaps}
              >
                <Text style={styles.mapsButtonText}>
                  🗺️ Lihat di Google Maps
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <View style={styles.placeholderIconContainer}>
                <Text style={styles.placeholderIcon}>🔓</Text>
              </View>
              <Text style={styles.placeholderText}>
                Belum ada data check-in.
              </Text>
              <Text style={styles.placeholderSubtext}>
                Silakan tekan tombol di bawah untuk mengambil selfie dan lokasi
                secara real-time.
              </Text>
            </View>
          )}
        </View>

        {/* Tombol Pemicu Utama */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#059669"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleCheckIn}
            >
              <Text style={styles.primaryButtonText}>
                {imageUri ? "🔄 Check-In Ulang" : "🚀 Ambil Snapshot & GPS"}
              </Text>
            </TouchableOpacity>

            {imageUri && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Hapus Data</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer Branding */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with Expo Go • Project Masion Topik13
        </Text>
      </View>
    </View>
  );
}

// Styling Terstruktur & Aesthetic (Emerald Theme)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4", // Light green base background
  },
  header: {
    backgroundColor: "#064e3b", // Deep emerald
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerSubtitle: {
    color: "#a7f3d0",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 25,
    minHeight: 320,
    justifyContent: "center",
  },
  placeholderContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  placeholderIconContainer: {
    backgroundColor: "#d1fae5",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  placeholderIcon: {
    fontSize: 32,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
  },
  previewContainer: {
    width: "100%",
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100, // Lingkaran sempurna rapi (Memenuhi syarat UI Level 1)
    borderWidth: 4,
    borderColor: "#059669",
    marginBottom: 15,
  },
  locationBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  locationTitle: {
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  locationText: {
    fontFamily: "monospace",
    color: "#4b5563",
    fontSize: 14,
  },
  mapsButton: {
    backgroundColor: "#2563eb", // Blue modern button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  mapsButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  actionContainer: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#059669", // Emerald accent
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  resetButton: {
    marginTop: 15,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 11,
  },
});
