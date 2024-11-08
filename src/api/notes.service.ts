import { AddNoteRequest } from '@/models/investment copy';
import { Note } from '@/types/data';

import { coreApi, TAGS } from './core.service';

export const notesApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    createNote: builder.mutation<Note, { investmentId: number; data: AddNoteRequest }>({
      query: ({ investmentId, data }) => ({
        url: `/locations/${investmentId}/notes`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAGS.INVESTMENTS],
    }),
    deleteNote: builder.mutation<void, { id: number; investmentId: number }>({
      query: ({ id }) => ({ url: `/notes/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, { investmentId }) => [
        { type: TAGS.INVESTMENTS, investmentId },
        TAGS.INVESTMENTS,
      ],
    }),
  }),
});

export const { useCreateNoteMutation, useDeleteNoteMutation } = notesApi;
