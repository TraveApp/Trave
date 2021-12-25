import React from "react";
import styled from "styled-components/native";
import type { ThemeBase } from '../../themes';

const HandleWrapper = styled.View`
	padding: 15px;
`;

const Handle = styled.View`
	align-self: center;
	height: 4px;
	width: 32px;
	border-radius: 4px;
	opacity: 0.5;
	background: ${({theme}: {theme: ThemeBase}) => theme.colors.text};
`;

const SuggestionsHandle = () => {
	return (<HandleWrapper>
		<Handle/>
	</HandleWrapper>)
};

export default SuggestionsHandle;