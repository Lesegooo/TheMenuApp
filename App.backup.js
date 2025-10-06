import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from "react-native";

const SafeImage = ({ source, style, fallbackSource }) => {
  const [error, setError] = useState(false);
  
  return (
    <Image 
      source={error ? fallbackSource : source} 
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default function App() {
  const [page, setPage] = useState("landing"); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [cart, setCart] = useState([]);

  const [booking, setBooking] = useState({
    date: "",
    guests: "",
    location: "",
    specialRequests: "",
  });

  const [dietary, setDietary] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairy: false,
    nuts: false,
    shellfish: false,
    tellMeMore: "",
  });

  const images = {

    "TheMenuLogo.png": require("./assets/TheMenuLogo.png"),

    "ButternutSagesoupStarter.jpg": require("./assets/ButternutSagesoupStarter.jpg"),
    "OctopusStarter.jpg": require("./assets/OctopusStarter.jpg"),
    "SnailsStarter.jpg": require("./assets/SnailsStarter.jpg"),
    "StickyWingsStarter.jpg": require("./assets/StickyWingsStarter.jpg"),
    "BaobunsStarter.jpg": require("./assets/BaobunsStarter.jpg"),

    "ChickenVergieMain.jpg": require("./assets/ChickenVergieMain.jpg"),
    "GrilledRibeyeSteakMain.jpg": require("./assets/GrilledRibeyeSteakMain.jpg"),
    "PanSearedDuckBreastWithCrispyPotatoesCharredMain.jpg": require("./assets/PanSearedDuckBreastWithCrispyPotatoesCharredMain.jpg"),
    "SeaFoodPastaMain.jpg": require("./assets/SeaFoodPastaMain.jpg"),
    "VegetableSaladMain.jpg": require("./assets/VegetableSaladMain.jpg"),

    "BrownieVanillaIceCreamDessert.jpg": require("./assets/BrownieVanillaIceCreamDessert.jpg"),
    "CheeseCakeDessert.jpg": require("./assets/CheeseCakeDessert.jpg"),
    "ChocolateBoomDessert.jpg": require("./assets/ChocolateBoomDessert.jpg"),
    "ChocolateCrackermuseDessert.jpg": require("./assets/ChocolateCrackermuseDessert.jpg"),
    "WaffleIcecreamDessert.jpg": require("./assets/WaffleIcecreamDessert.jpg"),

    "CherryDrinkBeverage.jpg": require("./assets/CherryDrinkBeverage.jpg"),
    "GinTonicBeverage.jpg": require("./assets/GinTonicBeverage.jpg"),
    "OrangeJuiceBeverage.jpg": require("./assets/OrangeJuiceBeverage.jpg"),
    "RedWineBeverage.jpg": require("./assets/RedWineBeverage.jpg"),
    "WhiteWineBeverage.jpg": require("./assets/WhiteWineBeverage.jpg"),
  };

  const menuData = {
    "Starters": [
      { id: "1", name: "Butternut Sage Soup", price: 80, description: "Creamy butternut squash soup with fresh sage", image: "ButternutSagesoupStarter.jpg" },
      { id: "2", name: "Grilled Octopus", price: 120, description: "Tender octopus with olive oil and herbs", image: "OctopusStarter.jpg" },
      { id: "3", name: "Garlic Snails", price: 100, description: "Escargot in garlic herb butter", image: "SnailsStarter.jpg" },
      { id: "4", name: "Sticky Wings", price: 60, description: "Crispy chicken wings with sweet glaze", image: "StickyWingsStarter.jpg" },
      { id: "5", name: "Steamed Bao Buns", price: 80, description: "Soft bao buns with savory filling", image: "BaobunsStarter.jpg" },
    ],
    "Mains": [
      { id: "6", name: "Chicken & Vegetables", price: 180, description: "Grilled chicken with seasonal vegetables", image: "ChickenVergieMain.jpg" },
      { id: "7", name: "Grilled Ribeye Steak", price: 220, description: "Prime ribeye with herb butter", image: "GrilledRibeyeSteakMain.jpg" },
      { id: "8", name: "Pan-Seared Duck Breast", price: 280, description: "Duck breast with crispy potatoes", image: "PanSearedDuckBreastWithCrispyPotatoesCharredMain.jpg" },
      { id: "9", name: "Fresh Vegetable Salad", price: 120, description: "Seasonal greens with light dressing", image: "VegetableSaladMain.jpg" }, 
      { id: "10", name: "Seafood Pasta", price: 220, description: "Fresh seafood in tomato basil sauce", image: "SeaFoodPastaMain.jpg" }, 
    ],
    "Desserts": [
      { id: "11", name: "Brownie with Vanilla Ice Cream", price: 80, description: "Warm chocolate brownie à la mode", image: "BrownieVanillaIceCreamDessert.jpg" },
      { id: "12", name: "New York Cheesecake", price: 90, description: "Classic creamy cheesecake", image: "CheeseCakeDessert.jpg" },
      { id: "13", name: "Chocolate Boom", price: 100, description: "Decadent chocolate explosion", image: "ChocolateBoomDessert.jpg" },
      { id: "14", name: "Chocolate Cracker Mousse", price: 110, description: "Light mousse with crispy layers", image: "ChocolateCrackermuseDessert.jpg" },
      { id: "15", name: "Waffle with Ice Cream", price: 95, description: "Belgian waffle with premium ice cream", image: "WaffleIcecreamDessert.jpg" },
    ],
    "Beverages": [
      { id: "16", name: "Cherry Delight", price: 80, description: "Refreshing cherry cocktail", image: "CherryDrinkBeverage.jpg" },
      { id: "17", name: "Gin & Tonic", price: 120, description: "Classic gin with premium tonic", image: "GinTonicBeverage.jpg" },
      { id: "18", name: "Fresh Orange Juice", price: 60, description: "Freshly squeezed orange juice", image: "OrangeJuiceBeverage.jpg" },
      { id: "19", name: "Red Wine Selection", price: 100, description: "House red wine by the glass", image: "RedWineBeverage.jpg" },
      { id: "20", name: "White Wine Selection", price: 100, description: "House white wine by the glass", image: "WhiteWineBeverage.jpg" },
    ]
  };

  const categories = Object.keys(menuData);

  const getImageSource = (imageName) => {
    return images[imageName] || images["TheMenuLogo.png"];
  };

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

    setPage("menu");
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert("Added to Cart", `${item.name} has been added to your cart`);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const formatPrice = (price) => {
    return `R${price}`;
  };

  const handleBookNext = () => {
    const { date, guests, location } = booking;
    if (!date || !guests || !location) {
      Alert.alert("Error", "Please fill in all booking details.");
      return;
    }
    setPage("dietary");
  };

  const handleDietaryBook = () => {
    setPage("thanks");
  };

  const renderMenuGrid = () => {
    const items = menuData[selectedCategory];
    
    return (
      <View style={styles.gridContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <SafeImage 
              source={getImageSource(item.image)} 
              style={styles.menuItemImage}
              fallbackSource={images["TheMenuLogo.png"]}
            />
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{formatPrice(item.price)}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.screen}>

      {page === "landing" && (
        <>
          <Text style={styles.tagline}>A New Experience Every Night</Text>

          <Image source={images["TheMenuLogo.png"]} style={styles.logo} />

          <Text style={styles.subtitle}>
            Chistoffel's many evolves with the seasons
          </Text>

          <Text style={styles.byline}>BY CHRISTOFFEL</Text>

          <TouchableOpacity style={styles.startButton} onPress={() => setPage("profile")}>
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        </>
      )}

      {page === "profile" && (
        <>
          <View style={styles.logoContainer}>
            <Image source={images["TheMenuLogo.png"]} style={styles.smallLogo} />
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
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {page === "menu" && (
        <>

          <View style={styles.menuHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("profile")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <Image source={images["TheMenuLogo.png"]} style={styles.menuLogo} />
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartText}>CART ({cart.length})</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => setPage("bookings")}
              >
                <Text style={styles.bookText}>BOOK</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.menuTitle}>Welcome to The Menu</Text>
          <Text style={styles.menuSubtitle}>Seasonal tasting experience</Text>

          <Text style={styles.categoryTitle}>{selectedCategory}</Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.categoryTabActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={styles.menuScrollView}>
            {renderMenuGrid()}
          </ScrollView>

          {cart.length > 0 && (
            <View style={styles.cartSummary}>
              <Text style={styles.cartTotal}>Total: {formatPrice(getCartTotal())}</Text>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {page === "bookings" && (
        <>
          <View style={styles.bookingHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("menu")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <Text style={styles.bookingTitle}>Bookings</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.bookingForm}>
            <Text style={styles.bookingLabel}>Date:</Text>
            <TextInput
              style={styles.bookingInput}
              placeholder="Select date"
              value={booking.date}
              onChangeText={(text) => setBooking({ ...booking, date: text })}
            />

            <Text style={styles.bookingLabel}>Guests:</Text>
            <TextInput
              style={styles.bookingInput}
              placeholder="Number of guests"
              value={booking.guests}
              onChangeText={(text) => setBooking({ ...booking, guests: text })}
              keyboardType="numeric"
            />

            <Text style={styles.bookingLabel}>Location:</Text>
            <TextInput
              style={styles.bookingInput}
              placeholder="Preferred location"
              value={booking.location}
              onChangeText={(text) => setBooking({ ...booking, location: text })}
            />

            <Text style={styles.bookingLabel}>Special Requests:</Text>
            <TextInput
              style={[styles.bookingInput, styles.textArea]}
              placeholder="Any special requests?"
              value={booking.specialRequests}
              onChangeText={(text) => setBooking({ ...booking, specialRequests: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("menu")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleBookNext}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {page === "dietary" && (
        <>
          <View style={styles.bookingHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("bookings")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <Text style={styles.bookingTitle}>Dietary</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.dietaryForm}>
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>
            
            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, vegetarian: !dietary.vegetarian })}
            >
              <View style={[styles.checkbox, dietary.vegetarian && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Vegetarian</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, vegan: !dietary.vegan })}
            >
              <View style={[styles.checkbox, dietary.vegan && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Vegan</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, glutenFree: !dietary.glutenFree })}
            >
              <View style={[styles.checkbox, dietary.glutenFree && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Gluten Free</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Allergies</Text>

            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, dairy: !dietary.dairy })}
            >
              <View style={[styles.checkbox, dietary.dairy && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Dairy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, nuts: !dietary.nuts })}
            >
              <View style={[styles.checkbox, dietary.nuts && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Nuts</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkboxItem}
              onPress={() => setDietary({ ...dietary, shellfish: !dietary.shellfish })}
            >
              <View style={[styles.checkbox, dietary.shellfish && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Shellfish</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Tell me more</Text>
            <TextInput
              style={[styles.bookingInput, styles.textArea]}
              placeholder="Any additional dietary requirements?"
              value={dietary.tellMeMore}
              onChangeText={(text) => setDietary({ ...dietary, tellMeMore: text })}
              multiline
              numberOfLines={4}
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("bookings")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleDietaryBook}>
              <Text style={styles.nextButtonText}>BOOK</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {page === "thanks" && (
        <>
          <View style={styles.thanksContainer}>
            <Text style={styles.thanksTitle}>Thanks for choosing</Text>
            <Image source={images["TheMenuLogo.png"]} style={styles.thanksLogo} />
            <Text style={styles.thanksSubtitle}>The Menu!</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("dietary")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={() => setPage("menu")}>
              <Text style={styles.doneButtonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  tagline: {
    marginTop: 60,
    marginBottom: 40,
    fontStyle: "italic",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 30,
    alignSelf: "center",
  },
  subtitle: {
    fontStyle: "italic",
    marginVertical: 20,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  byline: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#666",
    textAlign: "center",
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  startText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  logoContainer: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  smallLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 100,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#000",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLogo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cartButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
  },
  cartText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    backgroundColor: "#000",
  },
  bookText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  menuSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    fontStyle: "italic",
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    maxHeight: 50,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
  },
  categoryTabActive: {
    backgroundColor: "#000",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  categoryTextActive: {
    color: "#fff",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  menuScrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuCard: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    position: "relative",
  },
  menuItemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeholder: {
    width: 60,
  },
  bookingForm: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  bookingInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  dietaryForm: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },

  thanksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  thanksTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  thanksLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  thanksSubtitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#000",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});