const { postQuery } = require('@/services/api');
const { useMutation } = require('@tanstack/react-query');

export const useQuerySubmit = () => {
return useMutation({
  mutationFn:postQuery,
})
};
