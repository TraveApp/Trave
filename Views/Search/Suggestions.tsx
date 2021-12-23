import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import type { ThemeBase } from "../../themes";
import { Ionicons } from "@expo/vector-icons";
import SuggestionsBackground from "./SuggestionsBackground";
import SuggestionsHandle from "./SuggestionsHandle";
import { BusSuggestions, StationData, TrainSuggestions } from "./suggestionsData";
import { locate } from "./Locate";
import * as Location from "expo-location";

export default function Suggestions({
  show,
  type,
  direction,
  onSelect,
  onClose,
}: {
  show: boolean;
  type: "train" | "bus";
  direction: "SOURCE" | "DESTINATION";
  onSelect: (station: StationData) => void;
  onClose: () => void;
}) {
  const theme = useTheme() as ThemeBase;
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["50%", "75%"];
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);

  const history = [7302, 7328, 7583]; // TODO: Load this from memory (prob based on type)

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => setSearchQuery(""), [show]);

  const suggestionsProvider = useMemo(() => (type === "train" ? new TrainSuggestions() : new BusSuggestions()), [type]);

  const [searchResults, setSearchResults] = useState<Array<StationData>>([]);
  const [historyItems, setHisotryItems] = useState<Array<StationData>>([]);

  useEffect(() => {
    (async () => {
      if (type === "train") {
        setSearchResults(await (suggestionsProvider as TrainSuggestions).getSearchResults(searchQuery));
        setHisotryItems(
          await Promise.all(
            history.map(async (id: number) => await (suggestionsProvider as TrainSuggestions).getHistoryItemById(id))
          )
        );
      } else {
        setSearchResults(await suggestionsProvider.getSearchResults(searchQuery, direction));
        setHisotryItems(
          await Promise.all(
            history.map(async (id: number) => await suggestionsProvider.getHistoryItemById(id, direction))
          )
        );
      }
    })();
  }, [searchQuery, type]);

  return show ? (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundComponent={SuggestionsBackground as any}
        handleComponent={SuggestionsHandle as any}
        onChange={(idx: number) => {
          if (idx === -1) onClose();
          setCurrentSnapPoint(idx);
        }}
      >
        <Main>
          <View style={{ flexDirection: "row" }}>
            <SearchField
              editable
              textContentType="addressCity"
              clearButtonMode="never"
              spellCheck={false}
              autoCorrect={false}
              placeholderTextColor={"#666"}
              placeholder="Search for a station"
              onFocus={() => sheetRef.current?.snapToIndex(1)}
              onBlur={() => sheetRef.current?.snapToIndex(0)}
              onChangeText={(newSearchQuery) => setSearchQuery(newSearchQuery)}
            ></SearchField>
            <LocateButton>
              <TouchableOpacity
                onPress={async () => {
                  const { status } = await Location.requestForegroundPermissionsAsync();

                  if (status !== "granted") {
                    // TODO: error("Permission to access location was denied");
                    return;
                  }

                  const location = await Location.getCurrentPositionAsync({});
                  onSelect(
                    await locate(
                      `${type}/findbylocation`,
                      location.coords.latitude,
                      location.coords.longitude,
                      direction
                    )
                  );
                  sheetRef.current?.close();
                }}
              >
                <Ionicons name="ios-locate-outline" size={20} color={!theme.dark ? theme.colors.primary : "#fff"} />
              </TouchableOpacity>
            </LocateButton>
          </View>
          {searchQuery === "" ? (
            <History
              {...(Platform.OS === "ios"
                ? {
                    contentInset: { bottom: currentSnapPoint === 0 ? 220 : 10 },
                    automaticallyAdjustContentInsets: false,
                  }
                : {})}
            >
              {historyItems.map((item) => (
                <HistoryItem
                  key={item.id}
                  onPress={async () => {
                    onSelect(item);
                    sheetRef.current?.close();
                  }}
                >
                  <Ionicons name="ios-time-outline" size={20} color={!theme.dark ? "#000" : "#FFF"} />
                  <HistoryItemContent>
                    <HistoryItemName>{item.name}</HistoryItemName>
                    <HistoryItemRegion>{item.region}</HistoryItemRegion>
                  </HistoryItemContent>
                  <HistoryItemRemove name="ios-close" size={20} color={!theme.dark ? theme.colors.primary : "#FFF"} />
                </HistoryItem>
              ))}
            </History>
          ) : (
            <>
              <Results
                {...(Platform.OS === "ios"
                  ? {
                      contentInset: { bottom: currentSnapPoint === 0 ? 220 : 10 },
                      automaticallyAdjustContentInsets: false,
                    }
                  : {})}
              >
                {searchResults.slice(0, 10).map((item) => (
                  <Result
                    key={item.id}
                    onPress={() => {
                      onSelect(item);
                      sheetRef.current?.close();
                    }}
                  >
                    <Ionicons
                      name={type === "train" ? "ios-train" : "ios-bus"}
                      size={20}
                      color={!theme.dark ? "#000" : "#FFF"}
                    />
                    <ResultContent>
                      <ResultName>{item.name}</ResultName>
                      <ResultRegion>{item.region}</ResultRegion>
                    </ResultContent>
                  </Result>
                ))}
              </Results>
            </>
          )}
        </Main>
      </BottomSheet>
    </>
  ) : (
    <></>
  );
}

const Main = styled(Platform.OS === "ios" ? BottomSheetView : BottomSheetScrollView)`
  flex: 1;
`;

const LocateButton = styled.View`
  margin-left: 0;
  margin-right: 20px;
  height: 40px;
  width: 40px;
  padding-top: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const SearchField = styled.TextInput`
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 0px 20px;
  flex: 1;
  height: 40px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const History = styled(Platform.OS === "ios" ? ScrollView : View)`
  flex: 1;
`;

const HistoryItem = styled.TouchableOpacity`
  margin: 10px 20px;
  margin-bottom: 0px;
  padding: 0px 20px;
  height: 60px;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const HistoryItemContent = styled.View``;

const HistoryItemName = styled.Text`
  font-weight: bold;
  font-size: 15px;
  padding: 0px 10px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const HistoryItemRegion = styled.Text`
  font-weight: bold;
  font-size: 13px;
  text-transform: capitalize;
  padding: 0px 10px;
  opacity: 0.5;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const HistoryItemRemove = styled(Ionicons)`
  position: absolute;
  opacity: 0.7;
  right: 20px;
`;

const Results = History;

const Result = HistoryItem;

const ResultContent = styled.View``;

const ResultName = HistoryItemName;

const ResultRegion = HistoryItemRegion;
