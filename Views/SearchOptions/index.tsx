import React, { useState, useMemo } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import type { ThemeBase } from "../../themes";
import Suggestions from "./Suggestions";
import { StationData } from "./suggestionsData";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function SearchOptions({ navigation }: any) {
  const scheme = useColorScheme();
  const [modeActive, setModeActive] = useState<"bus" | "train">("train");
  const modeActiveOffset = useSharedValue(0);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsFor, setSuggestionsFor] = useState<"from" | "to">("from");
  const [optionFrom, setOptionFrom] = useState({ name: "", id: -1 });
  const [optionTo, setOptionTo] = useState({ name: "", id: -1 });

  const modeActiveStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(modeActiveOffset.value * 50, {
          damping: 200,
          stiffness: 400,
        }),
      },
    ],
  }));

  const switchToTrain = useMemo(
    () => () => {
      if (modeActive === "bus") {
        modeActiveOffset.value = 0;
        setModeActive("train");
        setOptionFrom({ name: "", id: -1 });
        setOptionTo({ name: "", id: -1 });
      }
    },
    [modeActive]
  );

  const switchToBus = useMemo(
    () => () => {
      if (modeActive === "train") {
        modeActiveOffset.value = 1;
        setModeActive("bus");
        setOptionFrom({ name: "", id: -1 });
        setOptionTo({ name: "", id: -1 });
      }
    },
    [modeActive]
  );

  return (
    <PanGestureHandler
      onGestureEvent={(e) => {
        if (e.nativeEvent.translationX > 100) {
          switchToTrain();
        } else if (-e.nativeEvent.translationX > 100) {
          switchToBus();
        }
      }}
    >
      <Main>
        <PageHeader>
          <PageTitle>Find a </PageTitle>
          <PageTitleAccentColor>{modeActive}</PageTitleAccentColor>
          <Mode>
            <ModeIcon onPress={() => switchToTrain()}>
              <Ionicons
                name="ios-train-sharp"
                size={24}
                color={scheme === "light" ? "#000" : "#FFF"}
              />
            </ModeIcon>
            <ModeIcon onPress={() => switchToBus()}>
              <Ionicons
                name="bus"
                size={24}
                color={scheme === "light" ? "#000" : "#FFF"}
              />
            </ModeIcon>
            <ModeActive style={[modeActiveStyle]} />
          </Mode>
        </PageHeader>
        <Options>
          <TouchableOpacity
            onPress={() => {
              setSuggestionsFor("from");
              setShowSuggestions(true);
            }}
          >
            <OptionBody>
              <OptionTitle empty={optionFrom.name === ""}>From</OptionTitle>
              {optionFrom.name !== "" ? (
                <Animated.View>
                  <OptionContent>{optionFrom.name}</OptionContent>
                </Animated.View>
              ) : (
                <></>
              )}
            </OptionBody>
          </TouchableOpacity>
          <OptionsDivider />
          <TouchableOpacity
            onPress={() => {
              setSuggestionsFor("to");
              setShowSuggestions(true);
            }}
          >
            <OptionBody>
              <OptionTitle empty={optionTo.name === ""}>To</OptionTitle>
              {optionTo.name !== "" ? (
                <OptionContent>{optionTo.name}</OptionContent>
              ) : (
                <></>
              )}
            </OptionBody>
          </TouchableOpacity>
          <OptionSmall
            activeOpacity={0.5}
            onPress={() => {
              const from = optionFrom;
              setOptionFrom(optionTo);
              setOptionTo(from);
            }}
          >
            <OptionButton>
              <Ionicons
                name="ios-swap-horizontal"
                size={24}
                color={scheme === "light" ? "#FFF" : "#000"}
              />
            </OptionButton>
          </OptionSmall>
        </Options>
        <SearchBtn
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SearchResults")}
        >
          <SearchBtnText>Search</SearchBtnText>
        </SearchBtn>
        <Suggestions
          type={modeActive}
          show={showSuggestions}
          direction={suggestionsFor === "from" ? "SOURCE" : "DESTINATION"}
          onClose={() => setShowSuggestions(false)}
          onSelect={(item: StationData) =>
            (suggestionsFor === "from" ? setOptionFrom : setOptionTo)(item)
          }
        />
      </Main>
    </PanGestureHandler>
  );
}

const Main = styled(SafeAreaView)`
  flex: 1;
`;

const PageHeader = styled.View`
  margin-top: 30px;
  margin-left: 30px;
  flex-direction: row;
`;

const PageTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const PageTitleAccentColor = styled(PageTitle)`
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;

const Mode = styled.View`
  position: absolute;
  top: -10px;
  right: 30px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  height: 50px;
  width: 100px;
  border-radius: 12.5px;
  flex-direction: row;
`;

const ModeActive = styled(Animated.View)`
  position: relative;
  top: 5px;
  right: 95px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.foreground};
  height: 40px;
  width: 40px;
  border-radius: 12.5px;
  z-index: 2;
`;

const ModeIcon = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const Options = styled.View`
  height: 160px;
  margin: 20px 30px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  border-radius: 20px;
`;

const OptionsDivider = styled.View`
  position: absolute;
  top: 80px;
  left: 25px;
  right: 60px;
  height: 2px;
  opacity: 0.05;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const OptionSmall = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 40px;
  bottom: 40px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

const OptionButton = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 12.5px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const OptionBody = styled.View`
  height: 80px;
  justify-content: center;
`;

const OptionTitle = styled.Text<{ empty?: boolean; theme: ThemeBase }>`
  opacity: 0.5;
  font-size: ${({ empty }: { empty?: boolean }) => (empty ? "18px" : "14px")};
  font-weight: 500;
  margin-left: 25px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const OptionContent = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 25px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const SearchBtn = styled.TouchableOpacity`
  height: 60px;
  margin: 0px 30px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const SearchBtnText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;
