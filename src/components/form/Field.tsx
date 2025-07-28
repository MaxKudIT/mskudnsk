import React, { FC } from "react";
import styles from '../../modules/Form.module.css'

export type FieldProps = {
    placeholder?: string;
    defaultValue?: string
    setValue: (value: string) => void
}

const Field: FC<FieldProps> = ({placeholder = '', defaultValue = '', setValue}) =>
  {
    return (
        <input onChange={(e) => setValue(e.target.value)} className={styles.input} defaultValue={defaultValue} placeholder={placeholder} />
    )
  }

  export default Field;