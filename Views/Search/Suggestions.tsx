import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import React, { useRef } from "react";
import styled, { useTheme } from "styled-components/native";
import type { ThemeBase } from "../../themes";
import { Ionicons } from "@expo/vector-icons";
import SuggestionsBackground from "./SuggestionsBackground";
import SuggestionsHandle from "./SuggestionsHandle";

export default function Suggestions({
  data,
  history,
  show,
  onClose,
}: {
  data: {
    id: number;
    name: string;
  };
  history: Array<string>;
  show: boolean;
  onClose: () => void;
}) {
  const theme = useTheme() as ThemeBase;
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["50%", "75%"];

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
          ></SearchField>
					<History>
						<HistoryItem>
            	<Ionicons name="ios-time-outline" size={20} color={!theme.dark ? "#000" : "#FFF"} />
							<HistoryItemName>Pruszcz Wielki</HistoryItemName>
            	<HistoryItemRemove name="ios-close" size={20} color={!theme.dark ? theme.colors.primary : "#FFF"} />
						</HistoryItem>
						<HistoryItem>
            	<Ionicons name="ios-time-outline" size={20} color={!theme.dark ? "#000" : "#FFF"} />
							<HistoryItemName>Rotmanka Gdańska</HistoryItemName>
            	<HistoryItemRemove name="ios-close" size={20} color={!theme.dark ? theme.colors.primary : "#FFF"} />
						</HistoryItem>
					</History>
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

const HistoryItem = styled.View`
  margin: 10px 20px;
	margin-bottom: 0px;
  padding: 0px 20px;
  height: 40px;
  border-radius: 10px;
	align-items: center;
	flex-direction: row;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const HistoryItemName = styled.Text`
	font-weight: bold;
	padding: 0px 10px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const HistoryItemRemove = styled(Ionicons)`
	position: absolute;
	opacity: 0.7;
	right: 20px;
`;