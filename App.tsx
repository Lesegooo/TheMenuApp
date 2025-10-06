import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Alert, 
  ScrollView,
  Animated,
  Easing,
  ImageSourcePropType
} from "react-native";

// TypeScript Interfaces
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface MenuData {
  [key: string]: MenuItem[];
}

interface FormData {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

interface BookingData {
  date: string;
  guests: string;
  location: string;
  specialRequests: string;
}

interface DietaryData {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairy: boolean;
  nuts: boolean;
  shellfish: boolean;
  tellMeMore: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// Props for SafeImage component
interface SafeImageProps {
  source: ImageSourcePropType;
  style: any;
  fallbackSource: ImageSourcePropType;
}

// Safe Image Component with TypeScript
const SafeImage: React.FC<SafeImageProps> = ({ source, style, fallbackSource }) => {
  const [error, setError] = useState<boolean>(false);
  
  return (
    <Image 
      source={error ? fallbackSource : source} 
      style={style}
      onError={() => setError(true)}
    />
  );
};

export default function App() {
  // State with TypeScript types
  const [page, setPage] = useState<string>("landing"); 
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("Starters");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [booking, setBooking] = useState<BookingData>({
    date: "",
    guests: "",
    location: "",
    specialRequests: "",
  });
  const [dietary, setDietary] = useState<DietaryData>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairy: false,
    nuts: false,
    shellfish: false,
    tellMeMore: "",
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Start animations when component mounts
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Trigger animation when page changes
  React.useEffect(() => {
    // Reset and animate on page change
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.9);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [page]);

  // Images with proper TypeScript typing - FIXED VERSION
  const images: Record<string, any> = {
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

  // Menu data with TypeScript typing
  const menuData: MenuData = {
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

  const categories: string[] = Object.keys(menuData);

  // Type-safe function to get image source - FIXED VERSION
  const getImageSource = (imageName: string): any => {
    return images[imageName] || images["TheMenuLogo.png"];
  };

  // Enhanced button press handler with animation
  const handleNext = (): void => {
    const { name, email, contact, password, confirmPassword } = form;

    // Using if statements for validation
    if (!name || !email || !contact || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Email validation using if statement
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setPage("menu");
  };

  // Enhanced add to cart with animation
  const addToCart = (item: MenuItem): void => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Animate cart update
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          })
        ]).start();

        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      // Animate new item addition
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();

      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    Alert.alert("Added to Cart", `${item.name} has been added to your cart`);
  };

  // Calculate total with TypeScript
  const getCartTotal = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  };

  // Format price function
  const formatPrice = (price: number): string => {
    return `R${price}`;
  };

  // Enhanced booking handler
  const handleBookNext = (): void => {
    const { date, guests, location } = booking;

    // Using if statements for validation
    if (!date || !guests || !location) {
      Alert.alert("Error", "Please fill in all booking details.");
      return;
    }

    // Validate guests is a number using if statement
    const guestsNumber = parseInt(guests);
    if (isNaN(guestsNumber) || guestsNumber < 1 || guestsNumber > 20) {
      Alert.alert("Error", "Please enter a valid number of guests (1-20).");
      return;
    }

    setPage("dietary");
  };

  const handleDietaryBook = (): void => {
    setPage("thanks");
  };

  // Remove item from cart
  const removeFromCart = (itemId: string): void => {
    setCart((prevCart: CartItem[]) => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
      
      // Animate removal
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();

      return updatedCart;
    });
  };

  // Enhanced menu grid with animations
  const renderMenuGrid = (): React.ReactElement => {
    const items = menuData[selectedCategory];
    
    return (
      <Animated.View 
        style={[
          styles.gridContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {items.map((item: MenuItem) => (
          <Animated.View 
            key={item.id} 
            style={[
              styles.menuCard,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
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
          </Animated.View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Landing Page */}
      {page === "landing" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <Text style={styles.tagline}>A New Experience Every Night</Text>

          <Image source={images["TheMenuLogo.png"]} style={styles.logo} />

          <Text style={styles.subtitle}>
            Chistoffel's many evolves with the seasons
          </Text>

          <Text style={styles.byline}>BY CHRISTOFFEL</Text>

          <TouchableOpacity 
            style={styles.startButton} 
            onPress={() => setPage("profile")}
          >
            <Text style={styles.startText}>START</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Profile Creation Page */}
      {page === "profile" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Image source={images["TheMenuLogo.png"]} style={styles.smallLogo} />
          </View>

          <Text style={styles.profileTitle}>Create Your Profile</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text: string) => setForm({ ...form, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={form.contact}
            onChangeText={(text: string) => setForm({ ...form, contact: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text: string) => setForm({ ...form, password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text: string) => setForm({ ...form, confirmPassword: text })}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("landing")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Menu Page */}
      {page === "menu" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          {/* Header */}
          <View style={styles.menuHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setPage("profile")}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <Image source={images["TheMenuLogo.png"]} style={styles.menuLogo} />
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartText}>CART ({getTotalItems()})</Text>
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
            {categories.map((category: string) => (
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
              <View style={styles.cartDetails}>
                <Text style={styles.cartTotal}>Total: {formatPrice(getCartTotal())}</Text>
                <Text style={styles.cartItems}>{getTotalItems()} items</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      )}

      {/* Bookings Page */}
      {page === "bookings" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
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
              onChangeText={(text: string) => setBooking({ ...booking, date: text })}
            />

            <Text style={styles.bookingLabel}>Guests:</Text>
            <TextInput
              style={styles.bookingInput}
              placeholder="Number of guests"
              value={booking.guests}
              onChangeText={(text: string) => setBooking({ ...booking, guests: text })}
              keyboardType="numeric"
            />

            <Text style={styles.bookingLabel}>Location:</Text>
            <TextInput
              style={styles.bookingInput}
              placeholder="Preferred location"
              value={booking.location}
              onChangeText={(text: string) => setBooking({ ...booking, location: text })}
            />

            <Text style={styles.bookingLabel}>Special Requests:</Text>
            <TextInput
              style={[styles.bookingInput, styles.textArea]}
              placeholder="Any special requests?"
              value={booking.specialRequests}
              onChangeText={(text: string) => setBooking({ ...booking, specialRequests: text })}
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
        </Animated.View>
      )}

      {/* Dietary Preferences Page */}
      {page === "dietary" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
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
              onChangeText={(text: string) => setDietary({ ...dietary, tellMeMore: text })}
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
        </Animated.View>
      )}

      {/* Thanks Page */}
      {page === "thanks" && (
        <Animated.View 
          style={[
            styles.pageContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
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
        </Animated.View>
      )}
    </View>
  );
}

// Styles remain exactly the same
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContainer: {
    flex: 1,
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
  cartDetails: {
    flex: 1,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItems: {
    fontSize: 14,
    color: "#666",
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
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 20,
    color: "#ff4444",
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