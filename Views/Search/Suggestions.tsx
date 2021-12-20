import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import type { ThemeBase } from "../../themes";
import { Ionicons } from "@expo/vector-icons";
import SuggestionsBackground from "./SuggestionsBackground";
import SuggestionsHandle from "./SuggestionsHandle";
import Fuse from "fuse.js";

export default function Suggestions({
  data,
  history,
  show,
  onSelect,
  onClose,
}: {
  data: Array<{
    id: number;
    name: string;
    region: string;
  }>;
  history: Array<number>;
  show: boolean;
  onSelect: (id: number) => void;
  onClose: () => void;
}) {
  const theme = useTheme() as ThemeBase;
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["50%", "75%"];

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => setSearchQuery(""), [show]);

  const fuseIndex = useMemo(() => Fuse.createIndex(["name"], data), [data]);
  const fuse = useMemo(
    () => new Fuse(data, { includeScore: false, keys: ["name"] }, fuseIndex),
    [fuseIndex]
  );
  const searchResults = useMemo(
    () => (searchQuery === "" ? [] : fuse.search(searchQuery)),
    [searchQuery]
  );

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
        }}
      >
        <Main>
          <SearchField
            editable
            textContentType="addressCity"
            clearButtonMode="always"
            spellCheck={false}
            autoCorrect={false}
            placeholderTextColor={"#666"}
            placeholder="Search for a station"
            onFocus={() => sheetRef.current?.snapToIndex(1)}
            onBlur={() => sheetRef.current?.snapToIndex(0)}
            onChangeText={(newSearchQuery) => setSearchQuery(newSearchQuery)}
          ></SearchField>
          {history.length !== 0 && searchResults.length === 0 ? (
            <History>
              {history.map((item) => (
                <HistoryItem
                  key={item}
                  onPress={() => {
                    onSelect(data[item].id);
                    sheetRef.current?.close();
                  }}
                >
                  <Ionicons
                    name="ios-time-outline"
                    size={20}
                    color={!theme.dark ? "#000" : "#FFF"}
                  />
                  <HistoryItemContent>
                    <HistoryItemName>{data[item].name}</HistoryItemName>
                    <HistoryItemRegion>{data[item].region}</HistoryItemRegion>
                  </HistoryItemContent>
                  <HistoryItemRemove
                    name="ios-close"
                    size={20}
                    color={!theme.dark ? theme.colors.primary : "#FFF"}
                  />
                </HistoryItem>
              ))}
            </History>
          ) : (
            <>
              <Results>
                {searchResults.slice(0, 10).map((item) => (
                  <Result
                    key={item.item.id}
                    onPress={() => {
                      onSelect(item.item.id);
                      sheetRef.current?.close();
                    }}
                  >
                    <Ionicons
                      name="ios-train"
                      size={20}
                      color={!theme.dark ? "#000" : "#FFF"}
                    />
                    <ResultContent>
                      <ResultName>{item.item.name}</ResultName>
                      <ResultRegion>{item.item.region}</ResultRegion>
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

const Main = styled(BottomSheetView)`
  flex: 1;
`;

const SearchField = styled.TextInput`
  margin: 0px 20px;
  margin-bottom: 10px;
  padding: 0px 20px;
  height: 40px;
  border-radius: 10px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const History = styled.ScrollView`
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
