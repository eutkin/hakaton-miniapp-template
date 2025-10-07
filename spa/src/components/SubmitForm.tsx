import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SubmitForm() {
  const { t } = useTranslation()
  const { submitForm, isSubmitting, error, success, resetForm } = useAppStore()
  const [formData, setFormData] = useState({
    name: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submitForm(formData)
      setFormData({ name: '' })
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  const handleReset = () => {
    setFormData({ name: ''})
    resetForm()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t('form.title')}</CardTitle>
        <CardDescription>{t('form.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('form.name')}</Label>
            <Input
              id="name"
              placeholder={t('form.namePlaceholder')}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {t('form.error')}: {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
              {t('form.success')}
            </div>
          )}

          <CardFooter className="flex gap-2 px-0">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('app.loading') : t('app.submit')}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              {t('app.cancel')}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
