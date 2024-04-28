// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float time;
varying vec2 vTexCoord;
uniform sampler2D cactiTex;

void main() 
{
    vec4 color2 = texture2D(cactiTex, vTexCoord);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // Draw a box pattern
    if((mod(gl_FragCoord.x, 7.0) < mod(time, 8.0) ||
        fract(gl_FragCoord.y) > 4.0) &&
        (mod(gl_FragCoord.y, 7.0) < mod(time, 8.0) ||
        fract(gl_FragCoord.x) > 4.0)
       )
    {
        gl_FragColor = vec4(0.0, 0.0, 0.0, .0);
        return;
    }
    else if (distance(u_mouse,gl_FragCoord.xy) < 5.0 && distance(u_mouse,gl_FragCoord.xy) > 4.0)
    {
        gl_FragColor = (vec4(0.0, 0.0, 0.0, 1.0));
        return;
    }

    vec3 color = vec3(0.0, 0.0, 0.0);
    color = vec3(abs(cos(st.x*0.5)-0.3),sin(u_time/90.0)+abs(tan(st.y)-0.3),0.3+abs(sin(u_time*0.5)));
    gl_FragColor = color2 + vec4(color,1.0);
}