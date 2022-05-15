import React from "react"
import { Box, Button, HStack, Link } from "@chakra-ui/react"
import { useAuth } from "./AuthUserProvider"
import { signInWithGoogle } from "../util/firebase"

const Navbar = () => {
    const { user, signOut } = useAuth()
    return (
      <Box px={4} shadow="base">
        <HStack justifyContent="space-between">
          <Button
            _focusVisible={{ shadow: "outline" }}
            _focus={{ shadow: "none" }}
            colorScheme={"facebook"}
            onClick={user ? signOut : signInWithGoogle}
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </HStack>
      </Box>
    )
  }
  
  export default Navbar