import React, {FC, useMemo} from 'react';
import ChatPreview, {ChatPreviewProps} from "../preview/ChatPreview";
import {ChatPreviewsRes} from "../../dto/chat";
import styles from "../../modules/Home.module.css";
import {useTheme} from "../context/ThemeContext";
import {useSelected} from "../context/selected/SelectedProvider";


export type FilterBy = 'all' | 'chats' | 'groups' | 'contacts'
export type FilteredListProps = {
    array: ChatPreviewsRes[],
    type: FilterBy,
    input: string
}




const FilteredList: FC<FilteredListProps> = ({array, type, input}) => {

    const {theme} = useTheme()

    const {selectedChatId} = useSelected()

    const filtered = useMemo(() => {
            const searchLower = input.toLowerCase();
            return array.filter(cp => 'User' in cp && cp.User.Name.toLowerCase().includes(searchLower))
    }, [input, array])

    return (
        <>
            {filtered.map(preview => <ChatPreview
                classname={preview.ChatId === selectedChatId ? styles[`chat_preview_selected_${theme}`]: styles[`chat_preview_${theme}`]}
                User={preview.User}
                MessageMeta={preview.MessageMeta}
                ChatId={preview.ChatId}
                ParticipantId={preview.ParticipantId}/>)}
        </>
    );
};

export default FilteredList;