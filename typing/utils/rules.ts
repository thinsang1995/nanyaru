import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

export type RulesProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  RegisterOptions<TFieldValues, TName>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>
