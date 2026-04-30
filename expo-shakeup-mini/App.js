import React, { useEffect, useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const goals = ["Lean Cut", "Muscle Gain", "Recovery", "Energy Boost"];
const flavors = [
  { name: "Chocolate Protein", color: "#8c4b31" },
  { name: "Matcha Latte", color: "#8aa856" },
  { name: "Grain Protein", color: "#d0b07c" },
  { name: "Strawberry Yogurt", color: "#d8899a" }
];
const payments = ["Card", "Samsung Pay", "Naver Pay", "Kakao Pay"];

export default function App() {
  const [step, setStep] = useState("start");
  const [goal, setGoal] = useState(goals[2]);
  const [flavor, setFlavor] = useState(flavors[0]);
  const [payment, setPayment] = useState(payments[0]);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (step !== "making") return undefined;
    setSeconds(15);
    const timer = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setStep("pickup");
          return 0;
        }
        return current - 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [step]);

  const screen = useMemo(() => {
    if (step === "start") {
      return (
        <>
          <Header title="ShakeUp" subtitle="Touch to start" />
          <View style={styles.startRing}><Text style={styles.ringLetter}>S</Text></View>
          <Primary label="Start order" onPress={() => setStep("goal")} />
        </>
      );
    }
    if (step === "goal") {
      return (
        <>
          <Header title="Choose your goal" subtitle="What fits today's workout?" />
          <View style={styles.grid}>{goals.map((item) => <Option key={item} label={item} active={goal === item} onPress={() => setGoal(item)} />)}</View>
          <Primary label="Next" onPress={() => setStep("flavor")} />
          <Secondary label="Back" onPress={() => setStep("start")} />
        </>
      );
    }
    if (step === "flavor") {
      return (
        <>
          <Header title="Select flavor" subtitle={`${goal} recommendation`} />
          <Cup flavor={flavor} />
          <View style={styles.grid}>{flavors.map((item) => <Option key={item.name} label={item.name} active={flavor.name === item.name} onPress={() => setFlavor(item)} />)}</View>
          <Primary label="Next" onPress={() => setStep("payment")} />
          <Secondary label="Back" onPress={() => setStep("goal")} />
        </>
      );
    }
    if (step === "payment") {
      return (
        <>
          <Header title="Payment" subtitle={`${flavor.name} - KRW 4,500`} />
          <View style={styles.stack}>{payments.map((item) => <Option key={item} label={item} active={payment === item} onPress={() => setPayment(item)} />)}</View>
          <Primary label="Pay" onPress={() => setStep("making")} />
          <Secondary label="Back" onPress={() => setStep("flavor")} />
        </>
      );
    }
    if (step === "making") {
      return (
        <>
          <Header title="Making your shake" subtitle={flavor.name} />
          <View style={styles.countRing}><Text style={styles.countText}>{seconds}</Text></View>
          <Text style={styles.helper}>Preparing your drink.</Text>
          <Primary label="Finish now" onPress={() => setStep("pickup")} />
        </>
      );
    }
    return (
      <>
        <Header title="Enjoy your shake" subtitle="Pick up from the front bay." />
        <Cup flavor={{ name: "Ready", color: "#1d2421" }} />
        <Primary label="New order" onPress={() => setStep("start")} />
      </>
    );
  }, [step, goal, flavor, payment, seconds]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.kiosk}>{screen}</View>
    </SafeAreaView>
  );
}

function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}<Text style={styles.accent}> Up</Text></Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

function Option({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.option, active && styles.optionActive]}>
      <Text style={styles.optionText}>{label}</Text>
    </Pressable>
  );
}

function Primary({ label, onPress }) {
  return <Pressable onPress={onPress} style={styles.primary}><Text style={styles.primaryText}>{label}</Text></Pressable>;
}

function Secondary({ label, onPress }) {
  return <Pressable onPress={onPress} style={styles.secondary}><Text style={styles.secondaryText}>{label}</Text></Pressable>;
}

function Cup({ flavor }) {
  return (
    <View style={[styles.cup, { backgroundColor: flavor.color }]}>
      <Text style={styles.cupText}>{flavor.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#070908", alignItems: "center", justifyContent: "center", padding: 24 },
  kiosk: { width: "100%", maxWidth: 420, minHeight: 720, backgroundColor: "#101411", borderRadius: 28, padding: 24, justifyContent: "space-between", borderWidth: 1, borderColor: "#263021" },
  header: { alignItems: "center", gap: 8 },
  title: { color: "#f7f8f1", fontSize: 30, lineHeight: 34, fontWeight: "900", textAlign: "center", textTransform: "uppercase" },
  accent: { color: "#98e000" },
  subtitle: { color: "#aeb7ad", fontSize: 16, fontWeight: "700", textAlign: "center" },
  startRing: { width: 164, height: 164, borderRadius: 82, borderWidth: 16, borderColor: "#98e000", alignSelf: "center", alignItems: "center", justifyContent: "center" },
  ringLetter: { color: "#f7f8f1", fontSize: 54, fontWeight: "900" },
  countRing: { width: 164, height: 164, borderRadius: 82, borderWidth: 16, borderColor: "#98e000", alignSelf: "center", alignItems: "center", justifyContent: "center" },
  countText: { color: "#f7f8f1", fontSize: 54, fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  stack: { gap: 10 },
  option: { flexBasis: "47%", minHeight: 72, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "rgba(255,255,255,.16)", backgroundColor: "rgba(255,255,255,.06)", justifyContent: "center" },
  optionActive: { borderColor: "#98e000", backgroundColor: "rgba(152,224,0,.16)" },
  optionText: { color: "#f7f8f1", fontSize: 15, fontWeight: "900", textTransform: "uppercase" },
  primary: { minHeight: 54, borderRadius: 12, backgroundColor: "#98e000", alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#0c1300", fontSize: 16, fontWeight: "900", textTransform: "uppercase" },
  secondary: { minHeight: 48, borderRadius: 12, backgroundColor: "rgba(255,255,255,.07)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,.16)" },
  secondaryText: { color: "#f7f8f1", fontSize: 15, fontWeight: "900", textTransform: "uppercase" },
  cup: { width: 164, height: 196, borderRadius: 28, alignSelf: "center", alignItems: "center", justifyContent: "center", padding: 18 },
  cupText: { color: "#fff", fontSize: 18, fontWeight: "900", textAlign: "center", textTransform: "uppercase" },
  helper: { color: "#aeb7ad", textAlign: "center", fontSize: 17, fontWeight: "700" }
});
