'use client'
import { Google } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Container,
  Card,
  Typography,
  Alert,
} from "@mui/material";
import GoogleSignIn from "../serveraction";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const LoginLogout = () => {

  // getting user session if it exists
  const { data: session, status } = useSession()
  const userid = session?.user?.userId
  const username = session?.user?.username

  const MobileLogin = () => (

    <Container sx={{
      minHeight: 'calc(100vh - 64px)',
      display: { md: 'flex' },
      flexDirection: { md: 'column' },
      alignItems: { md: 'center' },
      justifyContent: { md: 'center' },
    }}>

      <Box sx={{ pt: 5 }}>
        <Card sx={{ padding: 2, borderRadius: '16px' }}>

          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            <Typography variant='h6' sx={{ fontWeight: 500 }}>
              Login Options
            </Typography>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                onClick={() => GoogleSignIn()}
                color="error"
                variant="contained"
                startIcon={<Google />}
                sx={{
                  borderRadius: '16px',
                }}
              >
                Login with Google
              </Button>
              <Alert icon={false} severity="info" sx={{ mt: 2 }}>
                <Typography>
                  Google is currently the our sole auth service provider, please bear with us while we work on adding more!
                </Typography>
              </Alert>
            </Box>

          </CardContent>
        </Card>
      </Box>

    </Container>

  )

  if (status === 'loading') {
    return null
  }

  if (status === 'authenticated') {
    redirect('/')
  }

  return (
    <MobileLogin />
  )
}

export default LoginLogout;
