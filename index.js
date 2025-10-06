import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from "react-native";

export default function App() {
  const [page, setPage] = useState("landing"); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    const { name, email, contact, password, confirmPassword } = form;

    if (!name || !email || !contact || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setPage("menuLanding");
  };

  const menu = {
    starters: [
      { name: "Butternut & Sage Soup", image: require("./assets/Butternut_SageSoup_Starter.jpg") },
      { name: "Octopus Legs", image: require("./assets/Octopus_Starter.jpg") },
      { name: "Snails", image: require("./assets/Snails_starter.jpg") },
      { name: "Sticky Wings", image: require("./assets/Sticky_wings_starter.jpg") },
      { name: "BAO Buns", image: require("./assets/BAO_buns_starter.jpg") },
    ],
    mains: [
      { name: "Grilled Chicken With Veggies", image: require("./assets/Chicken_Vergie_main.jpg") },
      { name: "Ribeye Steak", image: require("./assets/Grilled_Ribeye_Steak_main.jpg") },
      { name: "Pan Seared Duck Breast", image: require("./assets/PanSearedDuckBreastWithCrispyPotatoesCharred_Main.jpg") },
      { name: "Vegetable Salad", image: require("./assets/Vegetable_salad_Main.jpg") },
      { name: "Seafood Pasta", image: require("./assets/SeaFood_Pasta_Main.jpg") },
    ],
    beverages: [
      { name: "Cherry Drink", image: require("./assets/Cherry_Drink_beverage.jpg") },
      { name: "Gin Tonic", image: require("./assets/Gin_Tonic_beverage.jpg") },
      { name: "Orange Juice", image: require("./assets/Orange_Juice_beverage.jpg") },
      { name: "Red Wine", image: require("./assets/Red_Wine_beverage.jpg") },
      { name: "White Wine", image: require("./assets/White_Wine_beverage.jpg") },
    ],
    desserts: [
      { name: "Brownie with Vanilla Ice Cream", image: require("./assets/Brownie_vanillaIceCream_dessert.jpg") },
      { name: "Cheesecake", image: require("./assets/cheese_cake_dessert.jpg") },
      { name: "Chocolate Boom", image: require("./assets/Chocolate_Boom_dessert.jpg") },
      { name: "Chocolate Cracker Muse", image: require("./assets/Chocolate_crackerMuse_Dessert.jpg") },
      { name: "Waffle with Ice Cream", image: require("./assets/waffle_icecream_dessert.jpg") },
    ],
  };

  const renderMenuPage = (items) => (
    <ScrollView contentContainerStyle={styles.menuScroll}>
      {items.map((item, index) => (
        <View key={index} style={styles.menuItem}>
          <Image source={item.image} style={styles.menuImage} />
          <Text style={styles.menuText}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.screen}>
      {/* Landing Page */}
      {page === "landing" && (
        <>
          <Text style={styles.tagline}>A New Experience Every Night</Text>
          <Image source={require("./assets/TheMenuLogo.png")} style={styles.logo} />
          <Text style={styles.subtitle}>
            Chistoffel's many evolves with the seasons
          </Text>
          <Text style={styles.byline}>BY CHRISTOFFEL</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setPage("profile")}>
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Profile Page */}
      {page === "profile" && (
        <>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => setPage("landing")}>
              <Image source={require("./assets/TheMenuLogo.png")} style={styles.smallLogo} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileTitle}>Create Your Profile</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={form.contact}
            onChangeText={(text) => setForm({ ...form, contact: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("landing")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Menu Landing */}
      {page === "menuLanding" && (
        <>
          <View style={styles.menuHeader}>
            <TouchableOpacity onPress={() => setPage("landing")}>
              <Image source={require("./assets/TheMenuLogo.png")} style={styles.smallLogoHeader} />
            </TouchableOpacity>
            <Text style={styles.menuTitle}>The Menu</Text>
          </View>
          <View style={styles.menuButtonRow}>
            <TouchableOpacity style={styles.menuNavButton} onPress={() => setPage("starters")}>
              <Text style={styles.menuNavText}>Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuNavButton} onPress={() => setPage("mains")}>
              <Text style={styles.menuNavText}>Mains</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuNavButton} onPress={() => setPage("beverages")}>
              <Text style={styles.menuNavText}>Beverages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuNavButton} onPress={() => setPage("desserts")}>
              <Text style={styles.menuNavText}>Desserts</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Starters Page */}
      {page === "starters" && (
        <>
          <TouchableOpacity style={styles.menuBackButton} onPress={() => setPage("menuLanding")}>
            <Text style={styles.menuBackText}>← Back</Text>
          </TouchableOpacity>
          {renderMenuPage(menu.starters)}
        </>
      )}

      {/* Mains Page */}
      {page === "mains" && (
        <>
          <TouchableOpacity style={styles.menuBackButton} onPress={() => setPage("menuLanding")}>
            <Text style={styles.menuBackText}>← Back</Text>
          </TouchableOpacity>
          {renderMenuPage(menu.mains)}
        </>
      )}

      {/* Beverages Page */}
      {page === "beverages" && (
        <>
          <TouchableOpacity style={styles.menuBackButton} onPress={() => setPage("menuLanding")}>
            <Text style={styles.menuBackText}>← Back</Text>
          </TouchableOpacity>
          {renderMenuPage(menu.beverages)}
        </>
      )}

      {/* Desserts Page */}
      {page === "desserts" && (
        <>
          <TouchableOpacity style={styles.menuBackButton} onPress={() => setPage("menuLanding")}>
            <Text style={styles.menuBackText}>← Back</Text>
          </TouchableOpacity>
          {renderMenuPage(menu.desserts)}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center" },
  tagline: { marginTop: 40, fontStyle: "italic", fontWeight: "600", fontSize: 18, textAlign: "center" },
  logo: { width: 200, height: 200, resizeMode: "contain", marginVertical: 20 },
  subtitle: { fontStyle: "italic", marginVertical: 10, fontWeight: "600", fontSize: 16, textAlign: "center" },
  byline: { fontSize: 12, fontWeight: "600", letterSpacing: 2, color: "#666", textAlign: "center" },
  startButton: { paddingVertical: 12, paddingHorizontal: 30, borderWidth: 2, borderColor: "#000", borderRadius: 8, marginTop: 20 },
  startText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  logoContainer: { position: "absolute", top: 50, left: 20 },
  smallLogo: { width: 80, height: 80, resizeMode: "contain" },
  profileTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 40, textAlign: "center" },
  input: { width: "90%", borderWidth: 1, borderColor: "#aaa", borderRadius: 8, padding: 12, marginVertical: 8, fontSize: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 20 },
  backButton: { paddingVertical: 12, paddingHorizontal: 30, borderWidth: 2, borderColor: "#000", borderRadius: 8 },
  backText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  nextButton: { paddingVertical: 12, paddingHorizontal: 30, borderWidth: 2, borderColor: "#000", borderRadius: 8, backgroundColor: "#000" },
  nextText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  menuHeader: { flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 20 },
  smallLogoHeader: { width: 60, height: 60, resizeMode: "contain", marginRight: 15 },
  menuTitle: { fontSize: 28, fontWeight: "bold" },
  menuButtonRow: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 20 },
  menuNavButton: { paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: "#000", borderRadius: 8 },
  menuNavText: { fontWeight: "600", fontSize: 16 },
  menuBackButton: { alignSelf: "flex-start", marginVertical: 10, marginLeft: 10 },
  menuBackText: { fontSize: 16, color: "#000" },
  menuScroll: { paddingBottom: 50, alignItems: "center" },
  menuItem: { marginBottom: 25, alignItems: "center", width: "90%" },
  menuImage: { width: "100%", height: 180, borderRadius: 12, resizeMode: "cover" },
  menuText: { marginTop: 8, fontSize: 18, fontWeight: "600" },
});