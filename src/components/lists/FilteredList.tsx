import React, {FC} from 'react';
import ChatPreview, {ChatPreviewProps} from "../preview/ChatPreview";


export type FilterBy = 'all' | 'chats' | 'groups' | 'contacts'
export type FilteredListProps = {
    array: ChatPreviewProps[],
    type: FilterBy,
    input: string
}

const SortArrayFunc = (array: ChatPreviewProps[], type: FilterBy, inputValue: string) => {
    if (type === 'chats') {
        return array.filter(cp => cp.nickname === inputValue)
    }
    return array
}


const FilteredList: FC<FilteredListProps> = ({array, type, input}) => {
    return (
        <>
            {/*{SortArrayFunc(array, type, input).map(cp => (<ChatPreview color={cp.color} nickname={cp.nickname} lastMessage={cp.lastMessage} date={cp.date}/> ))}*/}
        </>
    );
};

export default FilteredList;