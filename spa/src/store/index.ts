import {create} from 'zustand'
import WebApp from "@twa-dev/sdk";

interface FormData {
    name: string
}

interface AppState {
    formData: FormData
    isSubmitting: boolean
    error: string | null
    success: boolean
    setFormData: (data: Partial<FormData>) => void
    submitForm: (data: FormData) => Promise<void>
    resetForm: () => void
}

export const useAppStore = create<AppState>((set) => ({
    formData: {
        name: '',
    },
    isSubmitting: false,
    error: null,
    success: false,
    setFormData: (data) =>
        set((state) => ({
            formData: {...state.formData, ...data},
        })),
    submitForm: async (data) => {
        set({isSubmitting: true, error: null, success: false})
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Init-Data' : WebApp.initData
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to submit form')
            }

            const result = await response.json()
            set({isSubmitting: false, success: true})
            return result
        } catch (error) {
            set({
                isSubmitting: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            })
            throw error
        }
    },
    resetForm: () =>
        set({
            formData: {name: ''},
            error: null,
            success: false,
        }),
}))
