import React from "react";
import BottomSheetBackground from "@gorhom/bottom-sheet/lib/module/components/bottomSheetBackground/BottomSheetBackground";
import styled from "styled-components/native";

const Background = styled(BottomSheetBackground)`
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.15;
	shadow-radius: 5px;
  background: ${({ theme }) => theme.colors.card};
`;

const SuggestionsBackground = Background;
export default SuggestionsBackground;
