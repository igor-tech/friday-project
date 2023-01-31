import React from 'react';
import SuperInputText from '../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../common/c3-SuperCheckbox/SuperCheckbox';
import SuperEditableSpan from '../common/c4-SuperEditableSpan/SuperEditableSpan';
import SuperRadio from '../common/c6-SuperRadio/SuperRadio';
import SuperSelect from '../common/c5-SuperSelect/SuperSelect';
import SuperDebouncedInput from '../common/c8-SuperDebouncedInput/SuperDebouncedInput';
import SuperSort from '../common/c10-SuperSort/SuperSort';

export const SuperComponents = () => {
    return <div style={{display: 'flex',  gap: '20px', marginTop: '100px',flexDirection: 'column'}}>
        <SuperInputText placeholder={'Super input'}/>
        <SuperButton>Button</SuperButton>
        <SuperCheckbox children={'Checkbox'}/>
        <SuperEditableSpan value={'edit mode'}/>
        {/*<SuperSelect/>*/}
        <div><SuperRadio options={[{id: 1, value: '1'}, {id: 2, value: '2'},{id: 3, value: '3'}]} value={'1'}/></div>

        <SuperDebouncedInput placeholder={'debounce input'}/>
        <SuperSort sort={''} value={''} onChange={() => {}}/>
    </div>
}

