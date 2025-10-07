// import { useAuth } from 'react-oidc-context'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SubmitForm } from '@/components/SubmitForm'
import { Card, CardContent } from '@/components/ui/card'

function App() {
  // const auth = useAuth()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
  }

  // if (auth.isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-lg">{t('app.loading')}</div>
  //     </div>
  //   )
  // }
  //
  // if (auth.error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Card className="w-full max-w-md">
  //         <CardHeader>
  //           <CardTitle className="text-destructive">Authentication Error</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           <p className="text-sm text-muted-foreground">{auth.error.message}</p>
  //           <Button className="mt-4" onClick={() => auth.signinRedirect()}>
  //             {t('app.login')}
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }
  //
  // if (!auth.isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
  //       <Card className="w-full max-w-md">
  //         <CardHeader>
  //           <CardTitle>{t('app.title')}</CardTitle>
  //         </CardHeader>
  //         <CardContent className="space-y-4">
  //           <p className="text-muted-foreground">{t('auth.pleaseLogin')}</p>
  //           <Button onClick={() => auth.signinRedirect()} className="w-full">
  //             {t('app.login')}
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('app.title')}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleLanguage}>
              {i18n.language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </Button>
            {/*<Button variant="outline" onClick={() => auth.signoutRedirect()}>*/}
            {/*  {t('app.logout')}*/}
            {/*</Button>*/}
          </div>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                  {/*{t('app.welcome')}, {auth.user?.profile.name || auth.user?.profile.email}!*/}
                {t('app.welcome')}, Guest!
              </p>
            </CardContent>
          </Card>
        </div>

        <SubmitForm />
      </div>
    </div>
  )
}

export default App
