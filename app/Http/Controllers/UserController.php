<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @param $email
     * @param $password
     * @return \Illuminate\Http\JsonResponse|null
     */
    private function getToken($email, $password)
    {
        $token = null;
        //$credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = [
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'auth_token' => $user->auth_token,
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ];
        } else $response = [
                'success' => false,
                'data' => 'Record doesnt exists'
            ];

        return response()->json($response, 201);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $payload = [
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'auth_token' => ''
        ];

        $user = new User($payload);

        if ($user->save()) {

            $token = self::getToken($request->email, $request->password);

            if (!is_string($token))
                return response()->json([
                    'success' => false,
                    'data' => 'Token generation failed'
                ], 201);

            $user = User::where('email', $request->email)->get()->first();

            $user->auth_token = $token; // update user token

            $user->save();

            $response = [
                'success' => true,
                'data' => [
                    'name' => $user->name,
                    'id' => $user->id,
                    'email' => $request->email,
                    'auth_token' => $token
                ]
            ];
        } else $response = [
                'success'=>false,
                'data'=>'Couldn\'t register user'
            ];
        return response()->json($response, 201);
    }
}
