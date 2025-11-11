/*#if (UseOAuth2) */
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;

namespace MyService.Api.Extensions;

public static class OAuth2Extensions
{
    public static IServiceCollection AddOAuth2Authentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApp(configuration.GetSection("AzureAd"));

        services.AddAuthorization();

        return services;
    }
}
/*#endif */
