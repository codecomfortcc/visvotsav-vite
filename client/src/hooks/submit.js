import { useMutation } from '@tanstack/react-query';


export const useQuerySubmit = () => {
return useMutation({
  mutationFn:postQuery,
})
};
export const useFormSubmit =()=>{
  return useMutation({
    mutationFn:postQuery,
  })
}
