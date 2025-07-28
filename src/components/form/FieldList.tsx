import React, { FC } from "react";
import Field, { FieldProps } from "./Field";
import styles from '../../modules/Form.module.css'





const FieldList: FC<{data: FieldProps[]}> = ({data}) =>
  {
    return (
      <div className={styles.input_box}>
        {data.map(field => (
            <Field setValue={field.setValue} defaultValue={field.defaultValue} placeholder={field.placeholder}/>
        ))}
      </div>
    )
  }

  export default FieldList;